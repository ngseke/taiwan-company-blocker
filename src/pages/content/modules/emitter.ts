import EventEmitter from 'eventemitter3'
import { type Nullish } from '../../../types/Nullish'

export const CLICK_ITEM_ACTION = Symbol('CLICK_ITEM_ACTION')
export const RELOAD_BLOCKER = Symbol('CLICK_ITEM_ACTION')

export interface EventTypes {
  [CLICK_ITEM_ACTION]: (value: {
    jobTitle: Nullish<string>
    companyName: Nullish<string>
  }) => void
}

export const emitter = new EventEmitter<EventTypes>()
