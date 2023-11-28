import { loadPatterns } from '../../../modules/storage'
import { type BlockMethod, type Blocker } from './Blocker'
import { Blocker104Company } from './Blocker104Company'
import { Blocker104Job } from './Blocker104Job'
import { Blocker1111Company } from './Blocker1111Company'
import { Blocker1111Job } from './Blocker1111Job'
import { Blocker518 } from './Blocker518'
import { BlockerCakeresume } from './BlockerCakeresume'
import { BlockerCakeresumeCompany } from './BlockerCakeresumeCompany'
import { BlockerCakeresumeCompanyJob } from './BlockerCakeresumeCompanyJob'
import { BlockerYouratorCompany } from './BlockerYouratorCompany'
import { BlockerYouratorJob } from './BlockerYouratorJob'
import { type PlatformName, detectPagePlatform } from './platform'

export class BlockerManager {
  private readonly blockers: Blocker[] = []

  constructor () {
    const platformName = detectPagePlatform()
    if (!platformName) throw new Error('Cannot detect platform!')

    const initializeActions: Record<PlatformName, () => void> = {
      cakeresume: () => {
        this.addBlocker(
          new BlockerCakeresume(),
          new BlockerCakeresumeCompany(),
          new BlockerCakeresumeCompanyJob()
        )
      },
      yourator: () => {
        this.addBlocker(new BlockerYouratorJob(), new BlockerYouratorCompany())
      },
      104: () => {
        this.addBlocker(new Blocker104Job(), new Blocker104Company())
      },
      518: () => {
        this.addBlocker(new Blocker518())
      },
      1111: () => {
        this.addBlocker(new Blocker1111Job(), new Blocker1111Company())
      },
    }

    initializeActions[platformName]()
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
}
