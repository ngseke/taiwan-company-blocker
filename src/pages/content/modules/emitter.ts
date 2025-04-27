import EventEmitter from 'eventemitter3'
import { type Candidate } from './Candidate'
import { type RuleType } from '../../../modules/rule'

export const CLICK_ITEM_ACTION = Symbol('CLICK_ITEM_ACTION')
export const OPEN_SETTING = Symbol('OPEN_SETTING')

export interface EventTypes {
  [CLICK_ITEM_ACTION]: (candidate: Candidate) => void
  [OPEN_SETTING]: (options?: { type: RuleType, text: string }) => void
}

export const emitter = new EventEmitter<EventTypes>()
