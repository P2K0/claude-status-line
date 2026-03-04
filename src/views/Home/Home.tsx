import { useConfig } from '@/hooks/useConfig'
import { Header } from '@/views/Home/components/Header/Header'
import { LeftPanel } from '@/views/Home/components/LeftPanel/LeftPanel'
import { RightPanel } from '@/views/Home/components/RightPanel/RightPanel'

export default function App() {
  const { config } = useConfig()
  const isLight = config.previewMode === 'light'

  return (
    <div
      className={`flex flex-col h-screen w-full overflow-hidden font-sans
        ${isLight ? 'bg-white text-zinc-900' : 'bg-[#000000] text-zinc-100'}`}
    >
      <Header />
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  )
}
