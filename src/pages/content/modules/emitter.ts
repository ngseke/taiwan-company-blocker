import EventEmitter from 'eventemitter3'
import { type Candidate } from './Candidate'

export const CLICK_ITEM_ACTION = Symbol('CLICK_ITEM_ACTION')
export const RELOAD_BLOCKER = Symbol('CLICK_ITEM_ACTION')

export interface EventTypes {
  [CLICK_ITEM_ACTION]: (candidate: Candidate) => void
}

export const emitter = new EventEmitter<EventTypes>()
