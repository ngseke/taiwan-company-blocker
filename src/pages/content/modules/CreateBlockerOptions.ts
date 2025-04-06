import { type SelectorStrategy } from './getText'

export type VerticalPosition = 'top' | 'bottom'

export type HorizontalPosition = 'right' | 'left'

export type Position = `${VerticalPosition}-${HorizontalPosition}`

export interface ActivatorPositionStrategy {
  position: Position
  offset?: [number, number]
}

export type ActivatorStrategy = 'absolute' | 'fixed'

export interface CreateBlockerOptions {
  description: string
  itemsSelector: string
  jobTitleStrategy?: SelectorStrategy | string
  companyNameStrategy?: SelectorStrategy | string
  activatorPosition?: ActivatorPositionStrategy | Position
  activatorStrategy?: ActivatorStrategy
}
