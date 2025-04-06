export type TextStrategy =
  | { textType: 'textContent' }
  | { textType: 'dataset', textKey: string }
  | { textType: 'attribute', textKey: string }

export type SelectorTarget = 'document' | 'item'

export type SelectorStrategy = TextStrategy & {
  selectorTarget: SelectorTarget
  /** Root element if not provided  */
  selector?: string
}
export type VerticalPosition = 'top' | 'bottom'

export type HorizontalPosition = 'right' | 'left'

export type Position = `${VerticalPosition}-${HorizontalPosition}`

export interface ActivatorPositionStrategy {
  position: Position
  offset?: [number, number]
}

export interface CreateBlockerOptions {
  description: string
  itemsSelector: string
  jobTitleStrategy?: SelectorStrategy | string
  companyNameStrategy?: SelectorStrategy | string
  activatorPosition?: ActivatorPositionStrategy | Position
}
