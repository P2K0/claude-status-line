import type { ConfigState } from '@/constants'
import { useLocalStorageState } from 'ahooks'
import * as React from 'react'
import { createContext, useContext } from 'react'
import { defaultConfig } from '@/constants'

const ConfigContext = createContext<{
  config: ConfigState
  updateConfig: (key: keyof ConfigState, value: any) => void
} | null>(null)

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useLocalStorageState<ConfigState>(
    'statusline-builder-config',
    {
      defaultValue: defaultConfig,
    },
  )

  const updateConfig = (key: keyof ConfigState, value: any) => {
    setConfig(prev => ({
      ...prev,
      [key]: value,
    } as ConfigState))
  }

  return (
    <ConfigContext.Provider value={{ config: config || defaultConfig, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return context
}
