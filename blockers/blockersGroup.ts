import { type BlockersGroup } from '../schemas/blockersGroup'
import { _104BlockerOptions } from './104Blockers'
import { _1111BlockerOptions } from './1111Blockers'
import { _518BlockerOptions } from './518Blockers'
import { cakeBlockerOptions } from './cakeBlockers'
import { chickptBlockerOptions } from './chickptBlockers'
import { meetJobsBlockerOptions } from './meetJobsBlockers'
import { taiwanJobsBlockerOptions } from './taiwanJobsBlocker'
import { youratorBlockerOptions } from './youratorBlockers'

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
