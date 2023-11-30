import { loadPatterns } from '../../../modules/storage'
import { type BlockMethod, type Blocker } from './Blocker/Blocker'
import { type PlatformName, detectPagePlatform } from './platform'
import { cakeresumeBlockers } from './Blocker/cakeresumeBlockers'
import { youratorBlockers } from './Blocker/youratorBlockers'
import { _104Blockers } from './Blocker/104Blockers'
import { _518Blockers } from './Blocker/518Blockers'
import { _1111Blockers } from './Blocker/1111Blockers'
import { chickptBlockers } from './Blocker/chickptBlockers'

export class BlockerManager {
  private readonly blockers: Blocker[] = []

  constructor () {
    const platformName = detectPagePlatform()
    if (!platformName) throw new Error('Cannot detect platform!')

    const blockersGroup: Record<PlatformName, Blocker[]> = {
      cakeresume: cakeresumeBlockers,
      yourator: youratorBlockers,
      104: _104Blockers,
      518: _518Blockers,
      1111: _1111Blockers,
      chickpt: chickptBlockers,
    }

    const blockers = blockersGroup[platformName]
    blockers.forEach(blocker => {
      this.addBlocker(blocker)
    })
  }

  private addBlocker (...blocker: Blocker[]) {
    this.blockers.push(...blocker)
  }

  async start () {
    const companyNamePatterns = await loadPatterns('companyName')
    const jobTitlePatterns = await loadPatterns('jobTitle')

    this.blockers.forEach((blocker) => {
      blocker
        .setCompanyNamePatterns(companyNamePatterns.map(({ pattern }) => pattern))
        .setJobTitlePatterns(jobTitlePatterns.map(({ pattern }) => pattern))
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
    const companyNamePatterns = await loadPatterns('companyName')
    const jobTitlePatterns = await loadPatterns('jobTitle')

    this.blockers.forEach((blocker) => {
      blocker
        .setCompanyNamePatterns(companyNamePatterns.map(({ pattern }) => pattern))
        .setJobTitlePatterns(jobTitlePatterns.map(({ pattern }) => pattern))
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
