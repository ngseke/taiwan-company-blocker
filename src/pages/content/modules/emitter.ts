import EventEmitter from 'eventemitter3'
import { type Candidate } from './Candidate'

export const CLICK_ITEM_ACTION = Symbol('CLICK_ITEM_ACTION')
export const OPEN_SETTING = Symbol('OPEN_SETTING')

export interface EventTypes {
  [CLICK_ITEM_ACTION]: (candidate: Candidate) => void
  [OPEN_SETTING]: () => void
}

export const emitter = new EventEmitter<EventTypes>()
