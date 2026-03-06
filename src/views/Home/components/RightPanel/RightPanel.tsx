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
import { PreviewModeEnum } from '@/types'

function SectionGroup({ title, children }: Readonly<Omit<SectionGroupProps, 'isLight'>>) {
  return (
    <div className="mb-8">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3 text-foreground/80">{title}</h2>
      <div className="flex flex-col">{children}</div>
    </div>
  )
}

function SectionItem({ title, desc, children, noBorder }: Readonly<Omit<SectionItemProps, 'isLight'>>) {
  const borderClass = noBorder ? '' : 'border-b border-border'

  return (
    <div className={`py-5 flex flex-col gap-3 ${borderClass}`}>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        {desc && <span className="text-[12px] leading-relaxed text-muted-foreground">{desc}</span>}
      </div>
      <div className="w-full">{children}</div>
    </div>
  )
}

function getGridBtnStyle(active: boolean) {
  if (active) {
    return 'bg-foreground text-background border-foreground shadow-sm ring-1 ring-foreground/10'
  }

  return 'bg-card text-muted-foreground border-border hover:border-foreground/20 hover:text-foreground'
}

function GridBtn({ active, onClick, label, subLabel, variant = 'inverted' }: Readonly<Omit<GridBtnProps, 'isLight'>>) {
  const base = 'px-3 py-2.5 rounded-xl border text-xs font-medium flex flex-col items-center justify-center gap-0.5 cursor-pointer h-full transition-all duration-200 auto-rows-fr shadow-sm hover:shadow-md'
  const stateClass = getGridBtnStyle(active)
  const paddingClass = variant === 'hollow' && typeof label !== 'string' ? '!p-2.5' : ''

  const subLabelClass = active ? 'opacity-70' : 'text-muted-foreground/60'

  return (
    <button onClick={onClick} className={`${base} ${stateClass} ${paddingClass}`}>
      <span className="truncate w-full text-center">{label}</span>
      {subLabel && (
        <span className={`text-[9px] uppercase tracking-wider truncate w-full text-center ${subLabelClass}`}>{subLabel}</span>
      )}
    </button>
  )
}

function ListBtn({ active, onClick, leftLabel, rightLabel }: Readonly<Omit<ListBtnProps, 'isLight'>>) {
  const base = 'w-full px-3 py-2.5 rounded-lg border text-left flex items-center justify-between cursor-pointer transition-colors'
  let stateClass = ''

  if (active) {
    stateClass = 'bg-foreground text-background border-foreground shadow-sm ring-1 ring-foreground/10'
  }
  else {
    stateClass = 'bg-card text-muted-foreground border-border hover:border-foreground/20 hover:text-foreground'
  }

  return (
    <button onClick={onClick} className={`${base} ${stateClass} mb-2 last:mb-0`}>
      <span className="text-xs font-medium">{leftLabel}</span>
      <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded transition-colors ${active ? 'bg-background/20 text-background' : 'bg-muted text-muted-foreground'}`}>
        {rightLabel}
      </span>
    </button>
  )
}

export function RightPanel() {
  const { config, updateConfig } = useConfig()
  const { t } = useLanguage()
  const isLight = config.previewMode === PreviewModeEnum.Light

  return (
    <aside className="w-1/2 h-full overflow-y-auto custom-scrollbar border-l transition-colors duration-300 bg-panel border-border">
      <div className="px-6 py-8 max-w-[680px]">

        <SectionGroup title={t('panel.sectionVisual')}>

          <SectionItem title={t('panel.progressStyle')} desc={t('panel.progressDesc')}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {progressStyles.map((s) => {
                const isActive = config.progressStyle === s.id

                return (
                  <GridBtn
                    key={s.id}
                    variant="hollow"
                    active={isActive}
                    onClick={() => updateConfig('progressStyle', s.id)}
                    label={<span className={`font-mono text-sm tracking-widest truncate w-full text-center transition-colors ${isActive ? 'text-background' : 'text-foreground'}`}>{s.preview}</span>}
                    subLabel={t(`constants.${s.name}`, { defaultValue: s.name })}
                  />
                )
              })}
            </div>
          </SectionItem>

          <SectionItem title={t('panel.barColorMode')} desc={t('panel.barColorDesc')}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {barColorModes.map(c => (
                <GridBtn
                  key={c.id}
                  active={config.barColorMode === c.id}
                  onClick={() => updateConfig('barColorMode', c.id)}
                  label={t(`constants.${c.name}`, { defaultValue: c.name })}
                  subLabel={c.description ? t(`constants.${c.description}`, { defaultValue: c.description }) : undefined}
                />
              ))}
            </div>
          </SectionItem>

          <SectionItem title={t('panel.palette')} desc={t('panel.paletteDesc')}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {colorPresets.map((preset) => {
                const isActive = config.colorPreset === preset.id
                const palette = [
                  { k: 'model', v: preset.model },
                  { k: 'low', v: preset.low },
                  { k: 'mid', v: preset.mid },
                  { k: 'high', v: preset.high },
                  { k: 'token', v: preset.token },
                ]

                const containerClass = isActive
                  ? 'bg-foreground text-background border-foreground shadow-lg ring-1 ring-foreground/10'
                  : 'bg-card border-border hover:border-foreground/20 hover:bg-accent/50'

                const subLabelNameColor = isActive ? 'text-background/90' : 'text-foreground'
                const subLabelTypeColor = isActive ? 'text-background/60' : 'text-muted-foreground/60'

                return (
                  <button
                    key={preset.id}
                    onClick={() => updateConfig('colorPreset', preset.id)}
                    className={`flex flex-col gap-2.5 text-left p-4 rounded-xl border group cursor-pointer transition-all duration-200 ${containerClass}`}
                  >
                    <div>
                      <p className={`text-[11px] font-bold truncate transition-colors ${subLabelNameColor}`}>{preset.name}</p>
                      <p className={`text-[9px] uppercase tracking-wider transition-colors ${subLabelTypeColor}`}>
                        {isLight ? 'light' : 'dark'}
                      </p>
                    </div>
                    <div className="flex gap-1.5 mt-0.5">
                      {palette.map(c => (
                        <div key={c.k} className="w-3.5 h-3.5 rounded-full border border-black/5 shadow-sm" style={{ background: c.v }} title={c.k} />
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>
          </SectionItem>

          <SectionItem title={t('panel.layoutMode')} desc={t('panel.layoutDesc')}>
            <div className="grid grid-cols-2 gap-2">
              {layoutModes.map(m => (
                <GridBtn
                  key={m.id}
                  active={config.layoutMode === m.id}
                  onClick={() => updateConfig('layoutMode', m.id)}
                  label={t(`constants.${m.name}`, { defaultValue: m.name })}
                  subLabel={m.description ? t(`constants.${m.description}`, { defaultValue: m.description }) : undefined}
                />
              ))}
            </div>
          </SectionItem>

        </SectionGroup>

        <SectionGroup title={t('panel.sectionContent')}>

          <SectionItem title={t('panel.separator')} desc={t('panel.separatorDesc')}>
            <div className="p-4 rounded-xl border group transition-colors bg-card border-border">
              {separators.map(sep => (
                <ListBtn
                  key={sep.id}
                  active={config.separator === sep.id}
                  onClick={() => updateConfig('separator', sep.id)}
                  leftLabel={t(`constants.${sep.name}`, { defaultValue: sep.name })}
                  rightLabel={sep.preview}
                />
              ))}
            </div>
          </SectionItem>

          <SectionItem title={t('panel.modelFormat')} desc={t('panel.modelFormatDesc')}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {modelFormats.map(fmt => (
                <GridBtn
                  key={fmt.id}
                  active={config.modelFormat === fmt.id}
                  onClick={() => updateConfig('modelFormat', fmt.id)}
                  label={t(`constants.${fmt.name}`, { defaultValue: fmt.name })}
                  subLabel={fmt.example}
                />
              ))}
            </div>
          </SectionItem>

          <SectionItem title={t('panel.dirPrefix')} desc={t('panel.dirPrefixDesc')}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {dirPrefixes.map(p => (
                <GridBtn
                  key={p.id}
                  active={config.dirPrefix === p.id}
                  onClick={() => updateConfig('dirPrefix', p.id)}
                  label={p.char || '∅'}
                  subLabel={t(`constants.${p.name === '无' ? 'none' : p.name}`, { defaultValue: p.name === '无' ? 'none' : p.name })}
                />
              ))}
            </div>
          </SectionItem>

          <SectionItem title={t('panel.tokenFormat')} desc={t('panel.tokenFormatDesc')} noBorder>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {tokenFormats.map(tFmt => (
                <GridBtn
                  key={tFmt.id}
                  active={config.tokenFormat === tFmt.id}
                  onClick={() => updateConfig('tokenFormat', tFmt.id)}
                  label={t(`constants.${tFmt.name}`, { defaultValue: tFmt.name })}
                  subLabel={tFmt.template}
                />
              ))}
            </div>
          </SectionItem>

        </SectionGroup>

        <SectionGroup title={t('panel.sectionGit')}>

          <SectionItem title={t('panel.gitPrefix')} desc={t('panel.gitPrefixDesc')}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {gitPrefixes.map(p => (
                <GridBtn
                  key={p.id}
                  active={config.gitPrefix === p.id}
                  onClick={() => updateConfig('gitPrefix', p.id)}
                  label={p.char || '∅'}
                  subLabel={t(`constants.${p.name === '无' ? 'none' : p.name}`, { defaultValue: p.name === '无' ? 'none' : p.name })}
                />
              ))}
            </div>
          </SectionItem>

          <SectionItem title={t('panel.gitMode')} desc={t('panel.gitModeDesc')}>
            <div className="p-4 rounded-xl border group transition-colors bg-card border-border">
              {gitModes.map(m => (
                <ListBtn
                  key={m.id}
                  active={config.gitMode === m.id}
                  onClick={() => updateConfig('gitMode', m.id)}
                  leftLabel={t(`constants.${m.name}`, { defaultValue: m.name })}
                  rightLabel={m.preview}
                />
              ))}
            </div>
          </SectionItem>

        </SectionGroup>

        <div className="mt-8 mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border group transition-colors bg-card border-border">
            <div className="text-xs font-bold uppercase tracking-wider text-foreground">{t('panel.tipSecurity')}</div>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              {t('panel.tipSecurityDesc')}
            </p>
          </div>
          <div className="p-4 rounded-xl border group transition-colors bg-card border-border">
            <div className="text-xs font-bold uppercase tracking-wider text-foreground">{t('panel.tipCompat')}</div>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              {t('panel.tipCompatDesc')}
            </p>
          </div>
        </div>

      </div>
    </aside>
  )
}
