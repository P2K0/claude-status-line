export interface ColorPreset {
  id: string
  name: string
  type: 'dark' | 'light'
  model: string
  low: string
  mid: string
  high: string
  token: string
  bar: string
  ansi: {
    model: number
    low: number
    mid: number
    high: number
    token: number
    bar: number
  }
}

export interface ProgressStyle {
  id: string
  name: string
  filled: string
  empty: string
  preview: string
  gradient?: boolean
}

export interface CharacterOption {
  id: string
  name: string
  char: string
}

export interface PreviewOption {
  id: string
  name: string
  preview: string
}

export interface TemplateOption {
  id: string
  name: string
  template: string
}

export interface BasicOption {
  id: string
  name: string
  description?: string
  char?: string
  preview?: string
  example?: string
}
