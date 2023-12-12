import { type Blocker } from './Blocker/Blocker'
import { type PlatformName, detectPagePlatform } from './platform'
import { cakeresumeBlockerOptions } from './Blocker/cakeresumeBlockers'
import { youratorBlockerOptions } from './Blocker/youratorBlockers'
import { _104BlockerOptions } from './Blocker/104Blockers'
import { _518BlockerOptions } from './Blocker/518Blockers'
import { _1111BlockerOptions } from './Blocker/1111Blockers'
import { chickptBlockerOptions } from './Blocker/chickptBlockers'
import { type BlockMethod } from '../../../modules/BlockMethod'
import { createBlocker, type CreateBlockerOptions } from './Blocker/createBlocker'
import { loadParsedRules } from '../../../modules/ruleStorage'
import { meetJobsBlockerOptions } from './Blocker/meetJobsBlockers'
import { taiwanJobsBlockerOptions } from './Blocker/taiwanJobsBlocker'

export class BlockerManager {
  private readonly blockers: Blocker[] = []

  constructor () {
    const platformName = detectPagePlatform()
    if (!platformName) throw new Error('Cannot detect platform!')

    const blockerOptionsGroup: Record<PlatformName, CreateBlockerOptions[]> = {
      cakeresume: cakeresumeBlockerOptions,
      yourator: youratorBlockerOptions,
      104: _104BlockerOptions,
      518: _518BlockerOptions,
      1111: _1111BlockerOptions,
      chickpt: chickptBlockerOptions,
      meetJobs: meetJobsBlockerOptions,
      taiwanJobs: taiwanJobsBlockerOptions,
    }

    const blockerOptions = blockerOptionsGroup[platformName]

    blockerOptions.forEach((option) => {
      const blocker = createBlocker(option)
      this.addBlocker(blocker)
    })
  }

  private addBlocker (...blocker: Blocker[]) {
    this.blockers.push(...blocker)
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
  }

  get blockedCount () {
    const sum = this.blockers
      .reduce((sum, blocker) => (sum + blocker.blockedCount), 0)

    return sum
  }

  stop () {
    this.blockers.forEach((blocker) => { blocker.stop() })
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
