import { $$ } from './dom'
import { customAlphabet } from 'nanoid'
import { lowercase } from 'nanoid-dictionary'

const nanoid = customAlphabet(lowercase, 6)

export type MarkValue = 'matched' | 'notMatched'

/**
 * Mark the HTML element of job items
 */
export class Marker {
  private readonly key = `taiwan_company_blocker_${nanoid()}`

  mark ($item: HTMLElement, markValue: MarkValue) {
    $item.dataset[this.key] = markValue
  }

  unmark ($item: HTMLElement) {
    delete $item.dataset[this.key]
  }

  selectMarkedItems () {
    return $$(`[data-${this.key}]`)
  }

  getMarkValue ($item: HTMLElement) {
    return $item.dataset[this.key] as MarkValue | undefined
  }

  getIsMarked ($item: HTMLElement) {
    return this.key in $item.dataset
  }
}
