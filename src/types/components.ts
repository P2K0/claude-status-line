import type { ReactNode } from 'react'

export interface GridBtnProps {
  active: boolean
  onClick: () => void
  label: string | ReactNode
  subLabel?: string | ReactNode
  isLight?: boolean
  variant?: 'inverted' | 'hollow'
}

export interface ListBtnProps {
  active: boolean
  onClick: () => void
  leftLabel: string
  rightLabel: ReactNode
  isLight?: boolean
}

export interface SectionGroupProps {
  title: string
  children: ReactNode
  isLight?: boolean
}

export interface SectionItemProps {
  title: string
  desc?: string
  children: ReactNode
  isLight?: boolean
  noBorder?: boolean
}
