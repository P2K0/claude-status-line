import type { ConfigState } from '@/types'
import { useLocalStorageState } from 'ahooks'
import * as React from 'react'
import { useMemo } from 'react'
import { defaultConfig } from '@/constants'
import { ConfigContext } from './ConfigContext'

export function ConfigProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [config, setConfig] = useLocalStorageState<ConfigState>(
    'statusline-builder-config',
    {
      defaultValue: defaultConfig,
    },
  )

  const updateConfig = React.useCallback(<K extends keyof ConfigState>(key: K, value: ConfigState[K]) => {
    setConfig((prev) => {
      const current = prev ?? defaultConfig
      return {
        ...current,
        [key]: value,
      }
    })
  }, [setConfig])

  const value = useMemo(() => ({
    config: config ?? defaultConfig,
    updateConfig,
  }), [config, updateConfig])

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  )
}
