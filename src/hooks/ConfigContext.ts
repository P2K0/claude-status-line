import type { ConfigState } from '@/types'
import { createContext } from 'react'

export interface ConfigContextValue {
  config: ConfigState
  updateConfig: <K extends keyof ConfigState>(key: K, value: ConfigState[K]) => void
}

export const ConfigContext = createContext<ConfigContextValue | null>(null)
