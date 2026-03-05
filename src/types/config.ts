import type { PreviewModeEnum } from './enums'

export interface ConfigState {
  progressStyle: string
  colorPreset: string
  dirPrefix: string
  tokenFormat: string
  previewMode: PreviewModeEnum
  gitShow: boolean
  gitPrefix: string
  gitMode: string
  barColorMode: string
  separator: string
  modelFormat: string
  layoutMode: string
}
