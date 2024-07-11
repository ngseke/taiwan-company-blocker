import { type Blocker } from './Blocker'
import { type PlatformName, detectPagePlatform } from './platform'
import { type BlockMethod } from '../../../modules/BlockMethod'
import { createBlocker, type CreateBlockerOptions } from './createBlocker'
import { loadParsedRules } from '../../../modules/ruleStorage'
import { cakeBlockerOptions } from './blockerOptions/cakeBlockers'
import { youratorBlockerOptions } from './blockerOptions/youratorBlockers'
import { _104BlockerOptions } from './blockerOptions/104Blockers'
import { _518BlockerOptions } from './blockerOptions/518Blockers'
import { _1111BlockerOptions } from './blockerOptions/1111Blockers'
import { chickptBlockerOptions } from './blockerOptions/chickptBlockers'
import { meetJobsBlockerOptions } from './blockerOptions/meetJobsBlockers'
import { taiwanJobsBlockerOptions } from './blockerOptions/taiwanJobsBlocker'
import { type ActionActivator } from './ActionActivator'

export class BlockerManager {
  private readonly blockers: Blocker[] = []
  private readonly actionActivators: ActionActivator[] = []

  constructor () {
    const platformName = detectPagePlatform()
    if (!platformName) throw new Error('Cannot detect platform!')

    const blockerOptionsGroup: Record<PlatformName, CreateBlockerOptions[]> = {
      cakeresume: cakeBlockerOptions,
      yourator: youratorBlockerOptions,
      104: _104BlockerOptions,
      518: _518BlockerOptions,
      1111: _1111BlockerOptions,
      chickpt: chickptBlockerOptions,
      meetJobs: meetJobsBlockerOptions,
      taiwanJobs: taiwanJobsBlockerOptions,
    }

    const blockerOptions = blockerOptionsGroup[platformName]

    blockerOptions
      .map(createBlocker)
      .forEach(({ blocker, actionActivator }) => {
        this.blockers.push(blocker)
        this.actionActivators.push(actionActivator)
      })
  }

  async start () {
    const { companyNameRules, jobTitleRules } =
      await loadParsedRules()

    this.blockers.forEach((blocker) => {
      blocker
        .setCompanyNamePatterns(companyNameRules)
        .setJobTitlePatterns(jobTitleRules)
        .start()
    })

    this.actionActivators.forEach((actionActivator) => {
      actionActivator.start()
    })
  }

  get blockedCount () {
    const sum = this.blockers
      .reduce((sum, blocker) => (sum + blocker.blockedCount), 0)

    return sum
  }

  stop () {
    this.blockers.forEach((blocker) => { blocker.stop() })
    this.actionActivators.forEach((actionActivator) => {
      actionActivator.stop()
    })
  }

  async reload () {
    const { companyNameRules, jobTitleRules } =
      await loadParsedRules()

    this.blockers.forEach((blocker) => {
      blocker
        .setCompanyNamePatterns(companyNameRules)
        .setJobTitlePatterns(jobTitleRules)
        .reload()
    })
  }

  setBlockMethod (method: BlockMethod) {
    this.blockers.forEach((blocker) => { blocker.setBlockMethod(method) })
  }

  enableDebugger () {
    this.blockers.forEach((blocker) => { blocker.enableDebugger() })
  }
}
