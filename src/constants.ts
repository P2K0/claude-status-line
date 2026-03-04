export const progressStyles = [
  { id: 'classic', name: 'Classic', filled: '▓', empty: '░', preview: '▓▓▓░░' },
  { id: 'gradient', name: 'Gradient', filled: '█', empty: '▓▒░', preview: '███▓▒░', gradient: true },
  { id: 'diamond', name: 'Diamond', filled: '◆', empty: '◇', preview: '◆◆◆◇◇' },
  { id: 'dot', name: 'Dot', filled: '●', empty: '○', preview: '●●●○○' },
  { id: 'arrow', name: 'Arrow', filled: '▰', empty: '▱', preview: '▰▰▰▱▱' },
  { id: 'emoji', name: 'Emoji', filled: '🟢', empty: '⚪', preview: '🟢🟢🟢⚪⚪' },
  { id: 'braille', name: 'Braille', filled: '⣿', empty: '⣀', preview: '⣿⣿⣿⣀⣀' },
  { id: 'block', name: 'Block', filled: '█', empty: '░', preview: '███░░' },
  { id: 'star', name: 'Stars', filled: '★', empty: '☆', preview: '★★★☆☆' },
  { id: 'square', name: 'Square', filled: '■', empty: '□', preview: '■■■□□' },
  { id: 'fire', name: 'Fire', filled: '🔥', empty: '➖', preview: '🔥🔥🔥➖➖' },
]

export const colorPresets = [

  {
    id: 'dracula',
    name: 'Dracula',
    type: 'dark',
    model: '#af87ff',
    low: '#5fff87',
    mid: '#ffffaf',
    high: '#ff5f5f',
    token: '#afafd7',
    bar: '#af87ff',
    ansi: { model: 141, low: 84, mid: 229, high: 203, token: 189, bar: 141 },
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    type: 'dark',
    model: '#bb9af7',
    low: '#7dcfff',
    mid: '#e0af68',
    high: '#f7768e',
    token: '#a9b1d6',
    bar: '#7aa2f7',
    ansi: { model: 141, low: 117, mid: 179, high: 204, token: 146, bar: 111 },
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin',
    type: 'dark',
    model: '#cba6f7',
    low: '#a6e3a1',
    mid: '#f9e2af',
    high: '#f38ba8',
    token: '#bac2de',
    bar: '#89b4fa',
    ansi: { model: 183, low: 150, mid: 223, high: 211, token: 146, bar: 111 },
  },
  {
    id: 'gruvbox',
    name: 'Gruvbox',
    type: 'dark',
    model: '#d3869b',
    low: '#b8bb26',
    mid: '#fabd2f',
    high: '#fb4934',
    token: '#d5c4a1',
    bar: '#fe8019',
    ansi: { model: 175, low: 142, mid: 214, high: 203, token: 187, bar: 208 },
  },
  {
    id: 'nord',
    name: 'Nord',
    type: 'dark',
    model: '#b48ead',
    low: '#a3be8c',
    mid: '#ebcb8b',
    high: '#bf616a',
    token: '#81a1c1',
    bar: '#88c0d0',
    ansi: { model: 139, low: 144, mid: 222, high: 131, token: 110, bar: 116 },
  },
  {
    id: 'one-dark',
    name: 'One Dark',
    type: 'dark',
    model: '#c678dd',
    low: '#98c379',
    mid: '#e5c07b',
    high: '#e06c75',
    token: '#abb2bf',
    bar: '#61afef',
    ansi: { model: 176, low: 114, mid: 180, high: 168, token: 145, bar: 75 },
  },

  {
    id: 'everforest',
    name: 'Everforest',
    type: 'dark',
    model: '#d699b6',
    low: '#a7c080',
    mid: '#dbbc7f',
    high: '#e67e80',
    token: '#859289',
    bar: '#7fbbb3',
    ansi: { model: 175, low: 150, mid: 179, high: 167, token: 101, bar: 109 },
  },
  {
    id: 'rose-pine',
    name: 'Rosé Pine',
    type: 'dark',
    model: '#c4a7e7',
    low: '#9ccfd8',
    mid: '#f6c177',
    high: '#eb6f92',
    token: '#908caa',
    bar: '#ebbcba',
    ansi: { model: 183, low: 116, mid: 215, high: 211, token: 103, bar: 217 },
  },
  {
    id: 'monokai-pro',
    name: 'Monokai Pro',
    type: 'dark',
    model: '#78dce8',
    low: '#a9dc76',
    mid: '#ffd866',
    high: '#ff6188',
    token: '#939293',
    bar: '#ab9df2',
    ansi: { model: 117, low: 150, mid: 221, high: 204, token: 102, bar: 141 },
  },
  {
    id: 'ayu-dark',
    name: 'Ayu Dark',
    type: 'dark',
    model: '#73d0ff',
    low: '#aad94c',
    mid: '#ffd173',
    high: '#f28779',
    token: '#b3b1ad',
    bar: '#39bae6',
    ansi: { model: 117, low: 149, mid: 221, high: 210, token: 145, bar: 38 },
  },
  {
    id: 'material-ocean',
    name: 'Material',
    type: 'dark',
    model: '#82aaff',
    low: '#c3e88d',
    mid: '#ffcb6b',
    high: '#f07178',
    token: '#a6accd',
    bar: '#89ddff',
    ansi: { model: 111, low: 186, mid: 221, high: 204, token: 146, bar: 117 },
  },
  {
    id: 'palenight',
    name: 'Palenight',
    type: 'dark',
    model: '#c792ea',
    low: '#c3e88d',
    mid: '#ffcb6b',
    high: '#ff5370',
    token: '#676e95',
    bar: '#82aaff',
    ansi: { model: 176, low: 186, mid: 221, high: 204, token: 60, bar: 111 },
  },
  {
    id: 'horizon',
    name: 'Horizon',
    type: 'dark',
    model: '#25b0bc',
    low: '#09f7a0',
    mid: '#fab795',
    high: '#e95678',
    token: '#6c6f93',
    bar: '#f09483',
    ansi: { model: 38, low: 48, mid: 216, high: 204, token: 60, bar: 210 },
  },

  {
    id: 'github-light',
    name: 'GitHub Light',
    type: 'light',
    model: '#6f42c1',
    low: '#22863a',
    mid: '#b08800',
    high: '#d73a49',
    token: '#586069',
    bar: '#0366d6',
    ansi: { model: 97, low: 28, mid: 136, high: 160, token: 59, bar: 33 },
  },
  {
    id: 'solarized-light',
    name: 'Solarized',
    type: 'light',
    model: '#6c71c4',
    low: '#859900',
    mid: '#b58900',
    high: '#dc322f',
    token: '#657b83',
    bar: '#268bd2',
    ansi: { model: 62, low: 106, mid: 136, high: 160, token: 66, bar: 33 },
  },

  {
    id: 'mono-dark',
    name: 'Mono Dark',
    type: 'dark',
    model: '#e0e0e0',
    low: '#a0a0a0',
    mid: '#c0c0c0',
    high: '#ff6b6b',
    token: '#888888',
    bar: '#b0b0b0',
    ansi: { model: 254, low: 247, mid: 250, high: 203, token: 245, bar: 249 },
  },
  {
    id: 'mono-light',
    name: 'Mono Light',
    type: 'light',
    model: '#333333',
    low: '#555555',
    mid: '#444444',
    high: '#cc3333',
    token: '#777777',
    bar: '#444444',
    ansi: { model: 236, low: 240, mid: 238, high: 160, token: 243, bar: 238 },
  },
]

export const dirPrefixes = [
  { id: 'none', name: '无', char: '' },
  { id: 'folder', name: '📁', char: '📁' },
  { id: 'bolt', name: '⚡', char: '⚡' },
  { id: 'arrow', name: '>', char: '>' },
  { id: 'flower', name: '🌸', char: '🌸' },
  { id: 'zsh', name: '❯', char: '❯' },
  { id: 'lambda', name: 'λ', char: 'λ' },
  { id: 'dollar', name: '$', char: '$' },
  { id: 'home', name: '🏠', char: '🏠' },
  { id: 'tilde', name: '~/', char: '~/' },
]

export const tokenFormats = [
  { id: 'full', name: '完整', template: 'Total: input {in}k / output {out}k' },
  { id: 'compact', name: '紧凑', template: '↑{in}k ↓{out}k' },
  { id: 'minimal', name: '简约', template: 'in:{in}k out:{out}k' },
]

export const gitPrefixes = [
  { id: 'none', name: '无', char: '' },
  { id: 'leaf', name: '🌿', char: '🌿' },
  { id: 'git', name: 'git:', char: 'git:' },
  { id: 'branch', name: '⎇', char: '⎇ ' },
  { id: 'on', name: 'on', char: 'on ' },
  { id: 'merge', name: '🔀', char: '🔀' },
]

export const gitModes = [
  { id: 'minimal', name: '极简', preview: '+3 ~2 ?1' },
  { id: 'short', name: '短标', preview: 'A3 M2 ?1' },
  { id: 'detailed', name: '详细', preview: '3 new, 2 modified' },
]

export const barColorModes = [
  { id: 'static', name: '固定', description: '使用主题 bar 色' },
  { id: 'dynamic', name: '动态', description: '低→绿 中→黄 高→红' },
  { id: 'gradient', name: '渐变', description: '冷蓝到暖红过渡' },
]

export const separators = [
  { id: 'space', name: '空格', char: '  ', preview: '[Opus]  ▓▓░  32%' },
  { id: 'pipe', name: '管道', char: ' │ ', preview: '[Opus] │ ▓▓░ │ 32%' },
  { id: 'dot', name: '点', char: ' · ', preview: '[Opus] · ▓▓░ · 32%' },
  { id: 'angle', name: '箭头', char: ' › ', preview: '[Opus] › ▓▓░ › 32%' },
]

export const modelFormats = [
  { id: 'short', name: 'Short', example: 'Opus 4.6' },
  { id: 'full', name: 'Full', example: 'Claude Opus 4.6' },
  { id: 'abbr', name: 'Abbr', example: 'OPUS' },
  { id: 'icon', name: 'Icon', example: '🤖 Opus' },
]

export const layoutModes = [
  { id: 'double', name: '双行', description: '进度条/Token 在上，路径/Git 在下' },
  { id: 'single', name: '单行', description: '[Opus] ▓▓░ 32% ~/proj (main) +3 ~2' },
]

export interface ConfigState {
  progressStyle: string
  colorPreset: string
  dirPrefix: string
  tokenFormat: string
  previewMode: 'dark' | 'light'
  gitShow: boolean
  gitPrefix: string
  gitMode: string
  barColorMode: string
  separator: string
  modelFormat: string
  layoutMode: string
}

export const defaultConfig: ConfigState = {
  progressStyle: 'classic',
  colorPreset: 'dracula',
  dirPrefix: 'none',
  tokenFormat: 'full',
  previewMode: 'dark',
  gitShow: true,
  gitPrefix: 'none',
  gitMode: 'minimal',
  barColorMode: 'static',
  separator: 'space',
  modelFormat: 'short',
  layoutMode: 'double',
}
