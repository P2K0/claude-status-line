import { Github, Languages, Moon, Sun } from 'lucide-react'
import { useConfig } from '@/hooks/useConfig'
import { useLanguage } from '@/hooks/useLanguage'
import { PreviewModeEnum } from '@/types'

export function Header() {
  const { config, updateConfig } = useConfig()
  const { toggleLanguage } = useLanguage()
  const isLight = config.previewMode === PreviewModeEnum.Light

  return (
    <header className="h-14 px-6 flex items-center justify-between border-b transition-colors duration-300 bg-panel border-border">
      <div className="flex items-center">
        <h1 className="text-base font-bold tracking-wide text-foreground">
          Claude Status Line
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleLanguage}
          className="p-2 rounded-lg transition-colors duration-200 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          aria-label="Language"
        >
          <Languages size={18} />
        </button>

        <button
          onClick={() => updateConfig('previewMode', isLight ? PreviewModeEnum.Dark : PreviewModeEnum.Light)}
          className="p-2 rounded-lg transition-colors duration-200 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          aria-label="Toggle Theme"
        >
          {isLight ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <a
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-lg transition-colors duration-200 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Github size={18} />
        </a>
      </div>
    </header>
  )
}
