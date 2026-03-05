import type {
  GridBtnProps,
  ListBtnProps,
  SectionGroupProps,
  SectionItemProps,
} from '@/types'
import {
  barColorModes,
  colorPresets,
  dirPrefixes,
  gitModes,
  gitPrefixes,
  layoutModes,
  modelFormats,
  progressStyles,
  separators,
  tokenFormats,
} from '@/constants'
import { useConfig } from '@/hooks/useConfig'
import { useLanguage } from '@/hooks/useLanguage'

function SectionGroup({ title, children, isLight }: Readonly<SectionGroupProps>) {
  return (
    <div className="mb-8">
      <h2 className={`text-[11px] font-bold uppercase tracking-[0.18em] mb-3 ${isLight ? 'text-zinc-800' : 'text-zinc-100'}`}>{title}</h2>
      <div className="flex flex-col">{children}</div>
    </div>
  )
}

function SectionItem({ title, desc, children, isLight, noBorder }: Readonly<SectionItemProps>) {
  let borderClass = ''
  if (!noBorder) {
    borderClass = isLight ? 'border-b border-zinc-200' : 'border-b border-zinc-800/60'
  }

  return (
    <div className={`py-5 flex flex-col gap-3 ${borderClass}`}>
      <div className="flex flex-col gap-1">
        <span className={`text-sm font-semibold ${isLight ? 'text-zinc-800' : 'text-zinc-100'}`}>{title}</span>
        {desc && <span className="text-[12px] leading-relaxed text-zinc-500">{desc}</span>}
      </div>
      <div className="w-full">{children}</div>
    </div>
  )
}

function getGridBtnStyle(active: boolean, isLight: boolean, variant: 'inverted' | 'hollow') {
  if (active) {
    if (variant === 'inverted') {
      return isLight
        ? 'bg-zinc-900 text-white border-zinc-700 shadow-sm'
        : 'bg-zinc-100 text-zinc-900 border-zinc-300 shadow-sm'
    }
    return isLight
      ? 'bg-zinc-100 text-zinc-900 border-zinc-300 shadow-sm'
      : 'bg-zinc-800 border-zinc-600 ring-1 ring-zinc-500 text-zinc-100'
  }

  if (variant === 'inverted') {
    return isLight
      ? 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-800'
      : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200'
  }

  return isLight
    ? 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-800'
    : 'bg-zinc-900/20 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/30 text-zinc-400'
}

function GridBtn({ active, onClick, label, subLabel, isLight = false, variant = 'inverted' }: Readonly<GridBtnProps>) {
  const base = 'px-3 py-2.5 rounded-md border text-xs font-medium flex flex-col items-center justify-center gap-0.5 cursor-pointer h-full transition-colors auto-rows-fr'
  const stateClass = getGridBtnStyle(active, isLight, variant)
  const paddingClass = variant === 'hollow' && typeof label !== 'string' ? '!p-2.5 !rounded-lg' : ''

  const labelClass = variant === 'hollow' && active && !isLight ? 'text-zinc-200' : ''
  const subLabelClass = variant === 'hollow' ? 'text-zinc-500' : 'opacity-60 tracking-wide'

  return (
    <button onClick={onClick} className={`${base} ${stateClass} ${paddingClass}`}>
      <span className={`truncate w-full text-center ${labelClass}`}>{label}</span>
      {subLabel && (
        <span className={`text-[9px] uppercase tracking-wider truncate w-full text-center ${subLabelClass}`}>{subLabel}</span>
      )}
    </button>
  )
}

function ListBtn({ active, onClick, leftLabel, rightLabel, isLight }: Readonly<ListBtnProps>) {
  const base = 'w-full px-3 py-2.5 rounded-lg border text-left flex items-center justify-between cursor-pointer transition-colors'
  let stateClass = ''

  if (active) {
    stateClass = isLight
      ? 'bg-zinc-100 text-zinc-900 border-zinc-300 shadow-sm'
      : 'bg-zinc-800 border-zinc-600 ring-1 ring-zinc-500 text-zinc-300'
  }
  else {
    stateClass = isLight
      ? 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-800'
      : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40 text-zinc-300'
  }

  const badgeClass = isLight ? 'text-zinc-500 bg-zinc-100' : 'text-zinc-500 bg-zinc-900'

  return (
    <button onClick={onClick} className={`${base} ${stateClass}`}>
      <span className="text-xs font-medium">{leftLabel}</span>
      <span className={`font-mono text-xs px-2 py-0.5 rounded ${badgeClass}`}>
        {rightLabel}
      </span>
    </button>
  )
}

export function RightPanel() {
  const { config, updateConfig } = useConfig()
  const { t } = useLanguage()
  const isLight = config.previewMode === 'light'

  return (
    <aside className={`w-1/2 h-full overflow-y-auto custom-scrollbar border-l ${isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-black border-zinc-800'}`}>
      <div className="px-6 py-8 max-w-[680px]">

        <SectionGroup title={t('panel.sectionVisual')} isLight={isLight}>

          <SectionItem title={t('panel.progressStyle')} desc={t('panel.progressDesc')} isLight={isLight}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {progressStyles.map((s) => {
                const isActive = config.progressStyle === s.id
                let previewColor = ''
                if (isLight) {
                  previewColor = 'text-zinc-600'
                }
                else {
                  previewColor = isActive ? 'text-zinc-200' : 'text-zinc-400'
                }

                return (
                  <GridBtn
                    key={s.id}
                    variant="hollow"
                    active={isActive}
                    onClick={() => updateConfig('progressStyle', s.id)}
                    label={<span className={`font-mono text-sm tracking-widest truncate w-full text-center transition-colors ${previewColor}`}>{s.preview}</span>}
                    subLabel={t(`constants.${s.name}`, { defaultValue: s.name })}
                    isLight={isLight}
                  />
                )
              })}
            </div>
          </SectionItem>

          <SectionItem title={t('panel.barColorMode')} desc={t('panel.barColorDesc')} isLight={isLight}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {barColorModes.map(c => (
                <GridBtn
                  key={c.id}
                  active={config.barColorMode === c.id}
                  onClick={() => updateConfig('barColorMode', c.id)}
                  label={t(`constants.${c.name}`, { defaultValue: c.name })}
                  subLabel={c.description ? t(`constants.${c.description}`, { defaultValue: c.description }) : undefined}
                  isLight={isLight}
                />
              ))}
            </div>
          </SectionItem>

          <SectionItem title={t('panel.palette')} desc={t('panel.paletteDesc')} isLight={isLight}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {colorPresets.map((preset) => {
                const isActive = config.colorPreset === preset.id
                let stateClass = ''

                if (isActive) {
                  stateClass = isLight
                    ? 'bg-zinc-100 border-zinc-300 text-zinc-900 shadow-sm'
                    : 'bg-zinc-800 border-zinc-600 ring-1 ring-zinc-500'
                }
                else {
                  stateClass = isLight
                    ? 'bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800'
                    : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40'
                }

                const palette = [
                  { k: 'model', v: preset.model },
                  { k: 'low', v: preset.low },
                  { k: 'mid', v: preset.mid },
                  { k: 'high', v: preset.high },
                  { k: 'token', v: preset.token },
                ]

                let nameColorClass = ''
                if (isActive && !isLight)
                  nameColorClass = 'text-zinc-100'
                else if (!isLight)
                  nameColorClass = 'text-zinc-400'

                return (
                  <button
                    key={preset.id}
                    onClick={() => updateConfig('colorPreset', preset.id)}
                    className={`flex flex-col gap-2.5 text-left p-4 rounded-xl border group
            border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/30 cursor-pointer transition-colors ${stateClass}`}
                  >
                    <div>
                      <p className={`text-[11px] font-bold truncate ${nameColorClass}`}>{preset.name}</p>
                      <p className="text-[9px] uppercase tracking-wider text-zinc-600">{isLight ? 'light' : 'dark'}</p>
                    </div>
                    <div className="flex gap-1">
                      {palette.map(c => (
                        <div key={c.k} className="w-3 h-3 rounded-full" style={{ background: c.v }} />
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>
          </SectionItem>

          <SectionItem title={t('panel.layoutMode')} desc={t('panel.layoutDesc')} isLight={isLight}>
            <div className="grid grid-cols-2 gap-2">
              {layoutModes.map(m => (
                <GridBtn
                  key={m.id}
                  active={config.layoutMode === m.id}
                  onClick={() => updateConfig('layoutMode', m.id)}
                  label={t(`constants.${m.name}`, { defaultValue: m.name })}
                  subLabel={m.description ? t(`constants.${m.description}`, { defaultValue: m.description }) : undefined}
                  isLight={isLight}
                />
              ))}
            </div>
          </SectionItem>

        </SectionGroup>

        <SectionGroup title={t('panel.sectionContent')} isLight={isLight}>

          <SectionItem title={t('panel.separator')} desc={t('panel.separatorDesc')} isLight={isLight}>
            <div className="p-4 rounded-xl border group
            border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/30"
            >
              {separators.map(sep => (
                <ListBtn
                  key={sep.id}
                  active={config.separator === sep.id}
                  onClick={() => updateConfig('separator', sep.id)}
                  leftLabel={t(`constants.${sep.name}`, { defaultValue: sep.name })}
                  rightLabel={sep.preview}
                  isLight={isLight}
                />
              ))}
            </div>
          </SectionItem>

          <SectionItem title={t('panel.modelFormat')} desc={t('panel.modelFormatDesc')} isLight={isLight}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {modelFormats.map(fmt => (
                <GridBtn
                  key={fmt.id}
                  active={config.modelFormat === fmt.id}
                  onClick={() => updateConfig('modelFormat', fmt.id)}
                  label={t(`constants.${fmt.name}`, { defaultValue: fmt.name })}
                  subLabel={fmt.example}
                  isLight={isLight}
                />
              ))}
            </div>
          </SectionItem>

          <SectionItem title={t('panel.dirPrefix')} desc={t('panel.dirPrefixDesc')} isLight={isLight}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {dirPrefixes.map(p => (
                <GridBtn
                  key={p.id}
                  active={config.dirPrefix === p.id}
                  onClick={() => updateConfig('dirPrefix', p.id)}
                  label={p.char || '∅'}
                  subLabel={t(`constants.${p.name === '无' ? 'none' : p.name}`, { defaultValue: p.name === '无' ? 'none' : p.name })}
                  isLight={isLight}
                />
              ))}
            </div>
          </SectionItem>

          <SectionItem title={t('panel.tokenFormat')} desc={t('panel.tokenFormatDesc')} noBorder isLight={isLight}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {tokenFormats.map(tFmt => (
                <GridBtn
                  key={tFmt.id}
                  active={config.tokenFormat === tFmt.id}
                  onClick={() => updateConfig('tokenFormat', tFmt.id)}
                  label={t(`constants.${tFmt.name}`, { defaultValue: tFmt.name })}
                  subLabel={tFmt.template}
                  isLight={isLight}
                />
              ))}
            </div>
          </SectionItem>

        </SectionGroup>

        <SectionGroup title={t('panel.sectionGit')} isLight={isLight}>

          <SectionItem title={t('panel.gitPrefix')} desc={t('panel.gitPrefixDesc')} isLight={isLight}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {gitPrefixes.map(p => (
                <GridBtn
                  key={p.id}
                  active={config.gitPrefix === p.id}
                  onClick={() => updateConfig('gitPrefix', p.id)}
                  label={p.char || '∅'}
                  subLabel={t(`constants.${p.name === '无' ? 'none' : p.name}`, { defaultValue: p.name === '无' ? 'none' : p.name })}
                  isLight={isLight}
                />
              ))}
            </div>
          </SectionItem>

          <SectionItem title={t('panel.gitMode')} desc={t('panel.gitModeDesc')} isLight={isLight}>
            <div className="p-4 rounded-xl border group
            border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/30"
            >
              {gitModes.map(m => (
                <ListBtn
                  key={m.id}
                  active={config.gitMode === m.id}
                  onClick={() => updateConfig('gitMode', m.id)}
                  leftLabel={t(`constants.${m.name}`, { defaultValue: m.name })}
                  rightLabel={m.preview}
                  isLight={isLight}
                />
              ))}
            </div>
          </SectionItem>

        </SectionGroup>

        <div className="mt-8 mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border group
            border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/30"
          >
            <div className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-zinc-800' : 'text-zinc-100'}`}>{t('panel.tipSecurity')}</div>
            <p className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-500'}`}>
              {t('panel.tipSecurityDesc')}
            </p>
          </div>
          <div className="p-4 rounded-xl border group
            border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/30"
          >
            <div className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-zinc-800' : 'text-zinc-100'}`}>{t('panel.tipCompat')}</div>
            <p className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-500'}`}>
              {t('panel.tipCompatDesc')}
            </p>
          </div>
        </div>

      </div>
    </aside>
  )
}
