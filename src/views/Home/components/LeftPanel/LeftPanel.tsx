import { Copy, PlusCircle } from 'lucide-react'
import { useState } from 'react'

import {
  colorPresets,
  layoutModes,
  progressStyles,
} from '@/constants'
import { useConfig } from '@/hooks/useConfig'
import { useLanguage } from '@/hooks/useLanguage'

export function LeftPanel() {
  const { config } = useConfig()
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const isLight = config.previewMode === 'light'

  const pStyle = progressStyles.find(s => s.id === config.progressStyle) || progressStyles[0]
  const cPreset = colorPresets.find(c => c.id === config.colorPreset) || colorPresets[0]

  const selectedPreviewLayout = layoutModes.find(m => m.id === config.layoutMode)?.name || '双行'

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  let modelDisplay = 'Claude Opus 4.6'
  if (config.modelFormat === 'short') {
    modelDisplay = 'Opus 4.6'
  }
  else if (config.modelFormat === 'abbr') {
    modelDisplay = 'OPUS'
  }

  let tokenDisplay = 'Total: input 216k / output 15k'
  if (config.tokenFormat === 'compact') {
    tokenDisplay = '↑216k ↓15k'
  }
  else if (config.tokenFormat === 'minimal') {
    tokenDisplay = 'in:216k out:15k'
  }

  let btnClass = isLight
    ? 'bg-black text-white hover:bg-zinc-800 active:bg-zinc-900'
    : 'bg-white text-black hover:bg-zinc-200 active:bg-zinc-300'
  if (copied) {
    btnClass = 'bg-emerald-500 text-white'
  }

  return (
    <main className={`flex-1 h-full flex flex-col items-center justify-center p-8 transition-colors duration-200 ${
      isLight ? 'bg-zinc-50' : 'bg-[#000000]'
    }`}
    >
      <div className="flex-1 flex flex-col justify-center max-w-[480px] mx-auto w-full">

        <div className={`w-full rounded-xl overflow-hidden border mb-8 transition-colors duration-200
          ${isLight ? 'bg-white border-zinc-200 shadow-sm' : 'bg-black border-zinc-800'}`}
        >

          <div className={`flex items-center px-4 py-3 border-b ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/30 border-zinc-800'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-terminal ${isLight ? 'text-zinc-500' : 'text-zinc-600'}`}>
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" x2="20" y1="19" y2="19"></line>
            </svg>
            <span className={`ml-2 text-xs font-mono font-medium ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              ~/claude-code
            </span>
            <div className="ml-auto flex gap-1.5 items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>
          </div>

          <div className={`p-5 font-mono text-[13px] leading-relaxed min-h-[90px] ${isLight ? 'text-zinc-800' : 'text-[#e2e8f0]'}`}>
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
              <span style={{ color: cPreset.model }}>
                [
                {config.modelFormat === 'icon' ? '🤖 ' : ''}
                {modelDisplay}
                ]
              </span>

              <span style={{ color: cPreset.bar }}>
                {pStyle.filled.repeat(3)}
                <span className="opacity-40">
                  {'gradient' in pStyle && (pStyle as any).gradient ? '▓▒░░░░░' : pStyle.empty.repeat(7)}
                </span>
                {' 32%'}
              </span>

              <span style={{ color: cPreset.token }}>
                {tokenDisplay}
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-1">
              <span style={{ color: cPreset.low }}>~/claude-code</span>
              <span style={{ color: cPreset.mid }}>(main)</span>

              <span style={{ color: cPreset.high }}>✗</span>
              <span style={{ color: cPreset.low }}>+3</span>
              <span style={{ color: cPreset.mid }}>~2</span>
              <span style={{ color: cPreset.token }}>?1</span>

              <span className={`inline-block w-[6px] h-[13px] ml-1.5 align-middle animate-blink ${isLight ? 'bg-black' : 'bg-white'}`} style={{ animation: 'blink 1.2s step-end infinite' }}></span>
            </div>
          </div>

          <div className={`px-4 py-2 border-t text-[10px] font-mono flex gap-3 flex-wrap ${isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-500' : 'bg-zinc-900/20 border-zinc-800/50 text-zinc-600'}`}>
            <span>{t(`constants.${pStyle.name}`, pStyle.name)}</span>
            <span>·</span>
            <span>{t(`constants.${cPreset.name}`, cPreset.name)}</span>
            <span>·</span>
            <span>{t(`constants.${selectedPreviewLayout}`, selectedPreviewLayout)}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-md focus-ring cursor-pointer transition-colors ${btnClass}`}
        >
          {copied
            ? (
                <>
                  <PlusCircle size={16} />
                  {' '}
                  {t('left.copied')}
                </>
              )
            : (
                <>
                  <Copy size={16} />
                  {' '}
                  {t('left.copy')}
                </>
              )}
        </button>

        <div className="mt-5 text-xs leading-relaxed text-zinc-500 text-center">
          {t('left.guide1')}
          {' '}
          <code className={`px-1.5 py-0.5 rounded text-[11px] mx-0.5 ${isLight ? 'bg-zinc-100 text-zinc-700' : 'bg-zinc-900 text-zinc-300'}`}>Statusline installed!</code>
          {' '}
          {t('left.guide2')}
        </div>

      </div>

      <style>
        {`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}
      </style>
    </main>
  )
}
