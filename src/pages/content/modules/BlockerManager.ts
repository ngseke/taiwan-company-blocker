import { loadRules, loadSubscriptionResults } from '../../../modules/storage'
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
import { type SubscriptionResultSuccess } from '../../../modules/Subscription'
import { unique } from '../../../modules/unique'

async function loadParsedRules () {
  function parse (rules: string) {
    const separator = '\n'
    return unique(
      rules
        .split(separator)
        .map((rule) => rule.trim())
        .filter(Boolean)
    )
  }
  const storageCompanyNameRules = parse(await loadRules('companyName'))
  const storageJobTitleRules = parse(await loadRules('jobTitle'))

  const subscriptionResults = await loadSubscriptionResults()
  const subscriptionRules = Object.values(subscriptionResults)
    .filter((result): result is SubscriptionResultSuccess => (
      result.status === 'success'
    ))
    .map((result) => parse(result.rules))
    .flat(1)

  const companyNameRules = [
    ...storageCompanyNameRules,
    ...subscriptionRules,
  ]

  return {
    companyNameRules,
    jobTitleRules: storageJobTitleRules,
  }
}

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
    }

    const blockerOptions = blockerOptionsGroup[platformName]

    blockerOptions.forEach(option => {
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

  reveal () {
    this.blockers.forEach((blocker) => { blocker.reveal() })
  }

  unreveal () {
    this.blockers.forEach((blocker) => { blocker.unreveal() })
  }

  setBlockMethod (method: BlockMethod) {
    this.blockers.forEach((blocker) => { blocker.setBlockMethod(method) })
  }

  enableDebugger () {
    this.blockers.forEach((blocker) => { blocker.enableDebugger() })
  }
}
