import { Blocker } from './Blocker'

/**
 * Applies to:
 * - https://www.1111.com.tw/job/*
 */
export class Blocker1111JobSimilar extends Blocker {
  // TODO: Hard to implement since it's a slider
  protected selectItems () {
    return []
  }
}
