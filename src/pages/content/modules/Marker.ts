import { $$ } from './dom'
import { customAlphabet } from 'nanoid'
import { lowercase } from 'nanoid-dictionary'
import { type Nullish } from '../../../types/Nullish'

const nanoid = customAlphabet(lowercase, 6)

export interface MarkerValue {
  isMatched: boolean
  companyName: Nullish<string>
  jobTitle: Nullish<string>
}

/**
 * Mark the HTML element of job items
 */
export class Marker {
  private readonly key = `taiwan_company_blocker_${nanoid()}`

  mark ($item: HTMLElement, markerValue: MarkerValue) {
    $item.dataset[this.key] = JSON.stringify(markerValue)
  }

  unmark ($item: HTMLElement) {
    delete $item.dataset[this.key]
  }

  selectMarkedItems () {
    return $$(`[data-${this.key}]`)
  }

  getMarkerValue ($item: HTMLElement) {
    const rawValue = $item.dataset[this.key]
    if (!rawValue) return null

    try {
      const object = JSON.parse(rawValue) as MarkerValue
      return object
    } catch (err) {}
    return null
  }

  getIsMarked ($item: HTMLElement) {
    return this.key in $item.dataset
  }
}
