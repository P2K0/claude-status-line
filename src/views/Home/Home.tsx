import { useConfig } from '@/hooks/useConfig'
import { PreviewModeEnum } from '@/types'
import { Header } from '@/views/Home/components/Header/Header'
import { LeftPanel } from '@/views/Home/components/LeftPanel/LeftPanel'
import { RightPanel } from '@/views/Home/components/RightPanel/RightPanel'

export default function App() {
  const { config } = useConfig()
  const isDark = config.previewMode === PreviewModeEnum.Dark

  return (
    <div
      className={`flex flex-col h-screen w-full overflow-hidden font-sans bg-background text-foreground transition-colors duration-300
        ${isDark ? 'dark' : ''}`}
    >
      <Header />
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  )
}
