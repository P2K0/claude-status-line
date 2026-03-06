import type { CSSProperties } from 'react'
import { Copy, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import {
  barColorModes,
  colorPresets,
  dirPrefixes,
  gitModes,
  gitPrefixes,
  layoutModes,
  modelFormats,
  progressStyles,
  separators,
  tokenFormats,
} from '@/constants'
import { useConfig } from '@/hooks/useConfig'
import { useLanguage } from '@/hooks/useLanguage'
import { PreviewModeEnum } from '@/types'
import { generateScript } from '@/utils/builder'

export function LeftPanel() {
  const { config } = useConfig()
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const isLight = config.previewMode === PreviewModeEnum.Light

  const pStyle = progressStyles.find(s => s.id === config.progressStyle) || progressStyles[0]
  const cPreset = colorPresets.find(c => c.id === config.colorPreset) || colorPresets[0]

  const selectedPreviewLayout = layoutModes.find(m => m.id === config.layoutMode)?.name || '双行'

  const handleCopy = () => {
    const scriptContent = generateScript(config)
    const b64 = btoa(unescape(encodeURIComponent(scriptContent)))

    const configPy = `
import json, os
p = os.path.expanduser("~/.claude/settings.json")
s = json.load(open(p)) if os.path.exists(p) else {}
raw_path = os.path.expanduser("~/.claude/statusline.sh")
if "\\\\" in raw_path or (":" in raw_path and raw_path[1] == ":"):
    if ":" in raw_path:
        parts = raw_path.split(":")
        drive = parts[0].lower()
        path = parts[1].replace("\\\\", "/")
        final_path = f"/{drive}{path}"
    else:
        final_path = raw_path.replace("\\\\", "/")
    cmd = f"bash {final_path}"
else:
    cmd = raw_path

s["statusLine"] = {"type": "command", "command": cmd}
json.dump(s, open(p, "w"), indent=2, ensure_ascii=False)
`.trim()

    const configPyB64 = btoa(configPy)

    const installCmd = `mkdir -p ~/.claude && echo '${b64}' | base64 -d > ~/.claude/statusline.sh && chmod +x ~/.claude/statusline.sh && echo '${configPyB64}' | base64 -d | python3 && echo 'Statusline installed!'`

    navigator.clipboard.writeText(installCmd).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  let modelDisplay = 'Claude Opus 4.6'
  if (config.modelFormat === 'short') {
    modelDisplay = 'Opus 4.6'
  }
  else if (config.modelFormat === 'abbr') {
    modelDisplay = 'OPUS'
  }

  let tokenDisplay = 'Total: input 216k / output 15k'
  if (config.tokenFormat === 'compact') {
    tokenDisplay = '↑216k ↓15k'
  }
  else if (config.tokenFormat === 'minimal') {
    tokenDisplay = 'in:216k out:15k'
  }

  const dirPfxItem = dirPrefixes.find(p => p.id === config.dirPrefix)
  const dirPfx = dirPfxItem?.char || ''

  const gitPfxItem = gitPrefixes.find(p => p.id === config.gitPrefix)
  const gitPfx = gitPfxItem?.char || ''

  const sepItem = separators.find(s => s.id === config.separator)
  const sepChar = sepItem?.char || ''
  const isSpaceSep = sepItem?.id === 'space'
  const sepNode = !isSpaceSep ? <span className="opacity-40 select-none mx-0.5">{sepChar}</span> : <span className="mx-1"> </span>

  let barColorStyle: CSSProperties = { color: cPreset.bar }
  if (config.barColorMode === 'dynamic') {
    barColorStyle = { color: cPreset.low }
  }
  else if (config.barColorMode === 'gradient') {
    barColorStyle = {
      backgroundImage: `linear-gradient(90deg, ${cPreset.low}, ${cPreset.high})`,
      WebkitBackgroundClip: 'text',
      color: 'transparent',
    }
  }

  let btnClass = 'bg-foreground text-background hover:opacity-90 active:opacity-80'
  if (copied) {
    btnClass = 'bg-emerald-500 text-white'
  }

  const getThemeColor = (color: string, type: 'model' | 'low' | 'mid' | 'high' | 'token' | 'bar') => {
    if (isLight) {
      switch (type) {
        case 'model': return '#4a148c'
        case 'low': return '#1b5e20'
        case 'mid': return '#e65100'
        case 'high': return '#b71c1c'
        case 'token': return '#333333'
        case 'bar': return '#01579b'
        default: return color
      }
    }
    else {
      switch (type) {
        case 'mid': return '#ffd54f'
        case 'token': return '#e0e0e0'
        default: return color
      }
    }
  }

  return (
    <main className="flex-1 h-full flex flex-col items-center justify-center p-8 transition-colors duration-300 bg-panel">
      <div className="flex-1 flex flex-col justify-center max-w-[480px] mx-auto w-full">

        <div className="w-full rounded-xl overflow-hidden border mb-8 transition-colors duration-200 bg-card border-border shadow-sm">

          <div className="flex items-center px-4 py-3 border-b transition-colors duration-300 bg-muted/30 border-border">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-terminal transition-colors text-muted-foreground">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" x2="20" y1="19" y2="19" />
            </svg>
            <span className="ml-2 text-xs font-mono font-medium transition-colors text-muted-foreground">
              ~/claude-code
            </span>
            <div className="ml-auto flex gap-1.5 items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>
          </div>

          <div className={`p-5 font-mono text-[13px] leading-relaxed min-h-[90px] ${isLight ? 'text-slate-900' : 'text-zinc-100'}`}>
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
              <span style={{ color: getThemeColor(cPreset.model, 'model') }}>
                [
                {config.modelFormat === 'icon' ? '🤖 ' : ''}
                {modelDisplay}
                ]
              </span>

              {sepNode}

              <span style={isLight && config.barColorMode === 'static' ? { color: getThemeColor(cPreset.bar, 'bar') } : barColorStyle}>
                {pStyle.filled.repeat(3)}
                <span className="opacity-40">
                  {'gradient' in pStyle && pStyle.gradient ? '▓▒░░░░░' : pStyle.empty.repeat(7)}
                </span>
                {' 32%'}
              </span>

              {sepNode}

              <span style={{ color: getThemeColor(cPreset.token, 'token') }}>
                {tokenDisplay}
              </span>

              {config.layoutMode === 'single' && sepNode}

              {config.layoutMode === 'single' && (
                <>
                  {sepNode}
                  <span style={{ color: getThemeColor(cPreset.low, 'low') }}>
                    {dirPfx && <span className="mr-1">{dirPfx}</span>}
                    ~/claude-code
                  </span>

                  {sepNode}

                  <span style={{ color: getThemeColor(cPreset.mid, 'mid') }}>
                    {gitPfx && <span className="mr-1">{gitPfx}</span>}
                    (main)
                  </span>

                  {sepNode}

                  <span className="flex items-center gap-1.5">
                    {config.gitMode === 'short'
                      ? (
                          <>
                            <span style={{ color: getThemeColor(cPreset.high, 'high') }}>A3</span>
                            <span style={{ color: getThemeColor(cPreset.low, 'low') }}>M2</span>
                            <span style={{ color: getThemeColor(cPreset.token, 'token') }}>?1</span>
                          </>
                        )
                      : config.gitMode === 'detailed'
                        ? (
                            <span style={{ color: getThemeColor(cPreset.token, 'token') }}>3 new, 2 modified</span>
                          )
                        : (
                            <>
                              <span style={{ color: getThemeColor(cPreset.high, 'high') }}>✗</span>
                              <span style={{ color: getThemeColor(cPreset.low, 'low') }}>+3</span>
                              <span style={{ color: getThemeColor(cPreset.mid, 'mid') }}>~2</span>
                              <span style={{ color: getThemeColor(cPreset.token, 'token') }}>?1</span>
                            </>
                          )}
                  </span>

                  <span className="inline-block w-[6px] h-[13px] ml-1.5 align-middle animate-blink bg-foreground" style={{ animation: 'blink 1.2s step-end infinite' }} />
                </>
              )}
            </div>

            {config.layoutMode !== 'single' && (
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-1">
                <span style={{ color: getThemeColor(cPreset.low, 'low') }}>
                  {dirPfx && <span className="mr-1">{dirPfx}</span>}
                  ~/claude-code
                </span>

                {sepNode}

                <span style={{ color: getThemeColor(cPreset.mid, 'mid') }}>
                  {gitPfx && <span className="mr-1">{gitPfx}</span>}
                  (main)
                </span>

                {sepNode}

                <span className="flex items-center gap-1.5">
                  {config.gitMode === 'short'
                    ? (
                        <>
                          <span style={{ color: getThemeColor(cPreset.high, 'high') }}>A3</span>
                          <span style={{ color: getThemeColor(cPreset.low, 'low') }}>M2</span>
                          <span style={{ color: getThemeColor(cPreset.token, 'token') }}>?1</span>
                        </>
                      )
                    : config.gitMode === 'detailed'
                      ? (
                          <span style={{ color: getThemeColor(cPreset.token, 'token') }}>3 new, 2 modified</span>
                        )
                      : (
                          <>
                            <span style={{ color: getThemeColor(cPreset.high, 'high') }}>✗</span>
                            <span style={{ color: getThemeColor(cPreset.low, 'low') }}>+3</span>
                            <span style={{ color: getThemeColor(cPreset.mid, 'mid') }}>~2</span>
                            <span style={{ color: getThemeColor(cPreset.token, 'token') }}>?1</span>
                          </>
                        )}
                </span>

                <span className="inline-block w-[6px] h-[13px] ml-1.5 align-middle animate-blink bg-foreground" style={{ animation: 'blink 1.2s step-end infinite' }} />
              </div>
            )}
          </div>

          <div className={`px-4 py-2 border-t text-[9px] font-mono flex gap-x-2.5 gap-y-1.5 flex-wrap bg-muted/20 border-border ${isLight ? 'text-slate-800' : 'text-muted-foreground/80'}`}>
            {[
              t(`constants.${pStyle.name}`, { defaultValue: pStyle.name }),
              t(`constants.${cPreset.name}`, { defaultValue: cPreset.name }),
              t(`constants.${selectedPreviewLayout}`, { defaultValue: selectedPreviewLayout }),
              t(`constants.${separators.find(s => s.id === config.separator)?.name}`, { defaultValue: 'Space' }),
              t(`constants.${modelFormats.find(f => f.id === config.modelFormat)?.name}`, { defaultValue: 'Model' }),
              t(`constants.${barColorModes.find(m => m.id === config.barColorMode)?.name}`, { defaultValue: 'Bar' }),
              t(`constants.${tokenFormats.find(f => f.id === config.tokenFormat)?.name}`, { defaultValue: 'Token' }),
              t(`constants.${dirPrefixes.find(p => p.id === config.dirPrefix)?.name}`, { defaultValue: 'Dir' }),
              t(`constants.${gitPrefixes.find(p => p.id === config.gitPrefix)?.name}`, { defaultValue: 'Git' }),
              t(`constants.${gitModes.find(m => m.id === config.gitMode)?.name}`, { defaultValue: 'Mode' }),
            ].map((label, idx, arr) => (
              <div key={`${label}-${idx}`} className="flex items-center gap-2.5">
                <span className="truncate max-w-[80px]">{label}</span>
                {idx < arr.length - 1 && <span className="opacity-20 select-none">·</span>}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-md focus-ring cursor-pointer transition-colors ${btnClass}`}
        >
          {copied
            ? (
                <>
                  <PlusCircle size={16} />
                  {' '}
                  {t('left.copied')}
                </>
              )
            : (
                <>
                  <Copy size={16} />
                  {' '}
                  {t('left.copy')}
                </>
              )}
        </button>

        <div className="mt-5 text-xs leading-relaxed text-muted-foreground text-center">
          {t('left.guide1')}
          {' '}
          <code className={`px-1.5 py-0.5 rounded-md text-[11px] mx-0.5 font-mono border transition-colors ${
            isLight
              ? 'bg-slate-100 border-slate-300 text-slate-900 shadow-sm'
              : 'bg-zinc-800/80 border-zinc-700 text-zinc-100'
          }`}
          >
            Statusline installed!
          </code>
          {' '}
          {t('left.guide2')}
        </div>

      </div>

      <style>
        {`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}
      </style>
    </main>
  )
}
