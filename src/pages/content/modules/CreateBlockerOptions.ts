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
  /**
   * Human-readable description.
   */
  description: string
  /**
   *
   */
  exampleUrl?: string | string[]
  /**
   * The selector for the candidate items.
   */
  itemsSelector: string
  /**
   * Determines how the job title is extracted.
   */
  jobTitleStrategy?: SelectorStrategy | string
  /**
   * Determines how the company name is extracted.
   */
  companyNameStrategy?: SelectorStrategy | string
  /**
   * Specifies the position of the activator.
   */
  activatorPosition?: ActivatorPositionStrategy | Position
  /**
   * Determines how the activator is rendered.
   */
  activatorStrategy?: ActivatorStrategy
}
