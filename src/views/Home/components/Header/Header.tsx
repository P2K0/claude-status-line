import { Github, Languages, Moon, Sun } from 'lucide-react'
import { useConfig } from '@/hooks/useConfig'
import { useLanguage } from '@/hooks/useLanguage'

export function Header() {
  const { config, updateConfig } = useConfig()
  const { toggleLanguage } = useLanguage()
  const isLight = config.previewMode === 'light'

  return (
    <header className={`h-14 px-6 flex items-center justify-between border-b transition-colors duration-300
      ${isLight ? 'bg-white border-zinc-200' : 'bg-[#000000] border-zinc-800/60'}`}
    >
      <div className="flex items-center">
        <h1 className={`text-base font-bold tracking-wide ${isLight ? 'text-zinc-900' : 'text-zinc-100'}`}>
          Claude Status Line
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleLanguage}
          className={`p-2 rounded-lg transition-colors duration-200
            ${isLight ? 'text-zinc-600 hover:bg-zinc-100' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'}`}
          aria-label="Language"
        >
          <Languages size={18} />
        </button>

        <button
          onClick={() => updateConfig('previewMode', isLight ? 'dark' : 'light')}
          className={`p-2 rounded-lg transition-colors duration-200
            ${isLight ? 'text-zinc-600 hover:bg-zinc-100' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'}`}
          aria-label="Toggle Theme"
        >
          {isLight ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <a
          href="https://github.com/P2K0/claude-status-line"
          target="_blank"
          rel="noreferrer"
          className={`p-2 rounded-lg transition-colors duration-200
            ${isLight ? 'text-zinc-600 hover:bg-zinc-100' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'}`}
        >
          <Github size={18} />
        </a>
      </div>
    </header>
  )
}
