import { type BlockersGroup } from '../../../schemas/blockersGroup'
import { _104BlockerOptions } from './blockers/104Blockers'
import { _1111BlockerOptions } from './blockers/1111Blockers'
import { _518BlockerOptions } from './blockers/518Blockers'
import { cakeBlockerOptions } from './blockers/cakeBlockers'
import { chickptBlockerOptions } from './blockers/chickptBlockers'
import { meetJobsBlockerOptions } from './blockers/meetJobsBlockers'
import { taiwanJobsBlockerOptions } from './blockers/taiwanJobsBlocker'
import { youratorBlockerOptions } from './blockers/youratorBlockers'

export const blockersGroup: BlockersGroup = {
  cake: cakeBlockerOptions,
  yourator: youratorBlockerOptions,
  104: _104BlockerOptions,
  518: _518BlockerOptions,
  1111: _1111BlockerOptions,
  chickpt: chickptBlockerOptions,
  meetJobs: meetJobsBlockerOptions,
  taiwanJobs: taiwanJobsBlockerOptions,
}
