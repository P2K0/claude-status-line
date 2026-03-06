import type { ConfigState } from '@/types'
import {
  colorPresets,
  dirPrefixes,
  gitPrefixes,
  modelFormats,
  progressStyles,
  separators,
  tokenFormats,
} from '@/constants'

export function generateScript(state: ConfigState): string {
  const color = colorPresets.find(c => c.id === state.colorPreset)!
  const pStyle = progressStyles.find(s => s.id === state.progressStyle)!
  const prefix = dirPrefixes.find(d => d.id === state.dirPrefix)!
  const tFormat = tokenFormats.find(t => t.id === state.tokenFormat)!
  const gPrefix = gitPrefixes.find(g => g.id === state.gitPrefix)!
  const sep = separators.find(s => s.id === state.separator)!
  const modelFmt = modelFormats.find(m => m.id === state.modelFormat)!

  let tokenPrintf: string
  if (tFormat.id === 'full') {
    tokenPrintf = String.raw`printf "\${SEP}\${TOKEN_COLOR}Total: input %sk / output %sk\${RESET}" "$input_k" "$output_k"`
  }
  else if (tFormat.id === 'compact') {
    tokenPrintf = String.raw`printf "\${SEP}\${TOKEN_COLOR}↑%sk ↓%sk\${RESET}" "$input_k" "$output_k"`
  }
  else {
    tokenPrintf = String.raw`printf "\${SEP}\${TOKEN_COLOR}in:%sk out:%sk\${RESET}" "$input_k" "$output_k"`
  }

  const dirDisplay = prefix.char
    ? `echo "${prefix.char}\\\${parent}/\\\${current}"`
    : `echo "~/\\\${parent}/\\\${current}"`

  const bashGitBranchVar = '$' + '{git_branch}'
  let gitBranchFmt: string
  if (gPrefix.id === 'git') {
    gitBranchFmt = `git:(${bashGitBranchVar})`
  }
  else if (gPrefix.char) {
    gitBranchFmt = `${gPrefix.char}(${bashGitBranchVar})`
  }
  else {
    gitBranchFmt = `(${bashGitBranchVar})`
  }

  let gitCountsFmt: string
  if (state.gitMode === 'minimal') {
    gitCountsFmt = `[[ "$added" -gt 0 ]] && printf " \\\${GIT_CLEAN}+%s\\\${RESET}" "$added"
  [[ "$modified" -gt 0 ]] && printf " \\\${PROGRESS_MID}~%s\\\${RESET}" "$modified"
  [[ "$untracked" -gt 0 ]] && printf " \\\${TOKEN_COLOR}?%s\\\${RESET}" "$untracked"`
  }
  else if (state.gitMode === 'short') {
    gitCountsFmt = `[[ "$added" -gt 0 ]] && printf " \\\${GIT_CLEAN}A%s\\\${RESET}" "$added"
  [[ "$modified" -gt 0 ]] && printf " \\\${PROGRESS_MID}M%s\\\${RESET}" "$modified"
  [[ "$untracked" -gt 0 ]] && printf " \\\${TOKEN_COLOR}?%s\\\${RESET}" "$untracked"`
  }
  else {
    gitCountsFmt = `[[ "$added" -gt 0 ]] && printf " \\\${GIT_CLEAN}%s new\\\${RESET}" "$added"
  [[ "$modified" -gt 0 ]] && printf " \\\${PROGRESS_MID}%s modified\\\${RESET}" "$modified"
  [[ "$untracked" -gt 0 ]] && printf " \\\${TOKEN_COLOR}%s untracked\\\${RESET}" "$untracked"`
  }

  let getProgressColorFn: string
  if (state.barColorMode === 'dynamic') {
    getProgressColorFn = `get_progress_color() {
    local p=$1
    if (( p < 50 )); then echo -e "$PROGRESS_LOW"
    elif (( p < 80 )); then echo -e "$PROGRESS_MID"
    else echo -e "$PROGRESS_HIGH"
    fi
}`
  }
  else if (state.barColorMode === 'gradient') {
    getProgressColorFn = String.raw`get_progress_color() {
    local p=$1
    local hue=$(( 240 - p * 180 / 100 ))
    printf "\033[38;2;%d;%d;%dm" \
      "$(( 128 + p * 127 / 100 ))" \
      "$(( 128 - p * 64 / 100 ))" \
      "$(( 255 - p * 200 / 100 ))"
}`
  }
  else {
    getProgressColorFn = `get_progress_color() { echo -e "$PROGRESS_BAR"; }`
  }

  let modelFormatFn: string
  if (modelFmt.id === 'full') {
    modelFormatFn = `format_model() { echo "Claude $1"; }`
  }
  else if (modelFmt.id === 'abbr') {
    modelFormatFn = `format_model() { echo "$1" | awk '{print toupper($1)}'; }`
  }
  else if (modelFmt.id === 'icon') {
    modelFormatFn = `format_model() { echo "🤖 $(echo "$1" | awk '{print $1}')"; }`
  }
  else {
    modelFormatFn = `format_model() { echo "$1"; }`
  }

  const isDouble = state.layoutMode === 'double'

  const a = color.ansi

  const script = String.raw`
JSON_INPUT=$(cat)


MODEL_COLOR="\033[38;5;${a.model}m"
RESET="\033[0m"
PROGRESS_BAR="\033[38;5;${a.bar}m"
PROGRESS_LOW="\033[38;5;${a.low}m"
PROGRESS_MID="\033[38;5;${a.mid}m"
PROGRESS_HIGH="\033[38;5;${a.high}m"
TOKEN_COLOR="\033[38;5;${a.token}m"
DIR_COLOR="\033[38;5;${a.low}m"
GIT_COLOR="\033[38;5;${a.model}m"
GIT_CLEAN="\033[38;5;${a.low}m"
GIT_DIRTY="\033[38;5;${a.high}m"

PROGRESS_FILLED="${pStyle.filled}"
PROGRESS_EMPTY="${pStyle.empty}"
SEP="${sep.char}"

${getProgressColorFn}

${modelFormatFn}

${pStyle.gradient
  ? String.raw`get_progress_bar() {
    local p=$1
    local filled=$((p / 10))
    local empty=$((10 - filled))
    local bar=""
    for ((i=0; i<filled; i++)); do bar+="█"; done
    if (( empty > 0 )); then bar+="▓"; fi
    if (( empty > 1 )); then bar+="▒"; fi
    if (( empty > 2 )); then
        for ((i=0; i<empty-2; i++)); do bar+="░"; done
    fi
    echo "$bar"
}`
  : String.raw`get_progress_bar() {
    local p=$1
    local filled=$((p / 10))
    local empty=$((10 - filled))
    local bar=""
    for ((i=0; i<filled; i++)); do bar+="\${PROGRESS_FILLED}"; done
    for ((i=0; i<empty; i++)); do bar+="\${PROGRESS_EMPTY}"; done
    echo "$bar"
}`}

get_directory() {
    local dir="$1"
    local parent=$(basename "$(dirname "$dir")")
    local current=$(basename "$dir")
    if [[ "$parent" == "/" || -z "$parent" ]]; then
        ${prefix.char ? String.raw`echo "${prefix.char}\${current}"` : String.raw`echo "~/\${current}"`}
    else
        ${dirDisplay}
    fi
}

get_git_branch() { git -C "$1" rev-parse --abbrev-ref HEAD 2>/dev/null; }
get_git_status() {
    if git -C "$1" diff --quiet 2>/dev/null && git -C "$1" diff --cached --quiet 2>/dev/null; then
        echo "clean"
    else
        echo "dirty"
    fi
}

get_git_counts() {
    local dir="$1"
    local added=$(git -C "$dir" diff --cached --numstat 2>/dev/null | wc -l | tr -d ' ')
    local modified=$(git -C "$dir" diff --numstat 2>/dev/null | wc -l | tr -d ' ')
    local untracked=$(git -C "$dir" ls-files --others --exclude-standard 2>/dev/null | wc -l | tr -d ' ')
    echo "$added $modified $untracked"
}

format_tokens() { echo $(($1 / 1000)); }

progress_bar=$(get_progress_bar "$percent")
bar_color=$(get_progress_color "$percent")
directory=$(get_directory "$cwd")
input_k=$(format_tokens "$input")
output_k=$(format_tokens "$output")
model_name=$(format_model "$model")

${isDouble
  ? String.raw`
printf "\${MODEL_COLOR}[\${model_name}]\${RESET}"
printf "\${SEP}\${bar_color}\${progress_bar} \${percent}%%\${RESET}"
${tokenPrintf}
printf "\n"


printf "\${DIR_COLOR}\${directory}\${RESET}"
${state.gitShow
    ? String.raw`if [[ -n "$cwd" ]]; then
    git_branch=$(get_git_branch "$cwd")
    if [[ -n "$git_branch" ]]; then
        git_status=$(get_git_status "$cwd")
        printf " \${GIT_COLOR}${gitBranchFmt}\${RESET}"
        if [[ "$git_status" == "clean" ]]; then
            printf " \${GIT_CLEAN}✓\${RESET}"
        else
            printf " \${GIT_DIRTY}✗\${RESET}"
            read added modified untracked <<< "$(get_git_counts "$cwd")"
            ${gitCountsFmt}
        fi
    fi
fi`
    : ''
}
`
  : String.raw`
printf "\${MODEL_COLOR}[\${model_name}]\${RESET}"
printf "\${SEP}\${bar_color}\${progress_bar} \${percent}%%\${RESET}"
printf "\${SEP}\${DIR_COLOR}\${directory}\${RESET}"
${state.gitShow
    ? String.raw`if [[ -n "$cwd" ]]; then
    git_branch=$(get_git_branch "$cwd")
    if [[ -n "$git_branch" ]]; then
        git_status=$(get_git_status "$cwd")
        printf " \${GIT_COLOR}${gitBranchFmt}\${RESET}"
        if [[ "$git_status" != "clean" ]]; then
            printf " \${GIT_DIRTY}✗\${RESET}"
            read added modified untracked <<< "$(get_git_counts "$cwd")"
            ${gitCountsFmt}
        fi
    fi
fi`
    : ''
}
`}
`

  return script
}
