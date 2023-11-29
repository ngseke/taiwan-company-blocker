import { loadPatterns } from '../../../modules/storage'
import { type BlockMethod, type Blocker } from './Blocker/Blocker'
import { Blocker104Company } from './Blocker/Blocker104Company'
import { Blocker104Job } from './Blocker/Blocker104Job'
import { Blocker104JobRecommendation } from './Blocker/Blocker104JobRecommendation'
import { Blocker1111Company } from './Blocker/Blocker1111Company'
import { Blocker1111Job } from './Blocker/Blocker1111Job'
import { Blocker518 } from './Blocker/Blocker518'
import { BlockerCakeresume } from './Blocker/BlockerCakeresume'
import { BlockerCakeresumeCompany } from './Blocker/BlockerCakeresumeCompany'
import { BlockerCakeresumeCompanyJob } from './Blocker/BlockerCakeresumeCompanyJob'
import { BlockerCakeresumeJobAboutJob } from './Blocker/BlockerCakeresumeJobAboutJob'
import { BlockerCakeresumeJobCommonApplied } from './Blocker/BlockerCakeresumeJobCommonApplied'
import { BlockerYouratorCompany } from './Blocker/BlockerYouratorCompany'
import { BlockerYouratorCompanyJob } from './Blocker/BlockerYouratorCompanyJob'
import { BlockerYouratorEventCompany } from './Blocker/BlockerYouratorEventCompany'
import { BlockerYouratorEventJob } from './Blocker/BlockerYouratorEventJob'
import { BlockerYouratorJob } from './Blocker/BlockerYouratorJob'
import { type PlatformName, detectPagePlatform } from './platform'

export class BlockerManager {
  private readonly blockers: Blocker[] = []

  constructor () {
    const platformName = detectPagePlatform()
    if (!platformName) throw new Error('Cannot detect platform!')

    const constructorsGroup: Record<PlatformName, Array<new () => Blocker>> = {
      cakeresume: [
        BlockerCakeresume,
        BlockerCakeresumeCompany,
        BlockerCakeresumeCompanyJob,
        BlockerCakeresumeJobCommonApplied,
        BlockerCakeresumeJobAboutJob,
      ],
      yourator: [
        BlockerYouratorJob,
        BlockerYouratorCompany,
        BlockerYouratorCompanyJob,
        BlockerYouratorEventCompany,
        BlockerYouratorEventJob,
      ],
      104: [
        Blocker104Job,
        Blocker104Company,
        Blocker104JobRecommendation,
      ],
      518: [
        Blocker518,
      ],
      1111: [
        Blocker1111Job,
        Blocker1111Company,
      ],
    }

    const constructors = constructorsGroup[platformName]
    constructors.forEach(Constructor => {
      this.addBlocker(new Constructor())
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
}
