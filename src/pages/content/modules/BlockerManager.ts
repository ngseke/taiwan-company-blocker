import { loadPatterns } from '../../../modules/storage'
import { type BlockMethod, type Blocker } from './Blocker/Blocker'
import { Blocker104Companies } from './Blocker/Blocker104Companies'
import { Blocker104Jobs } from './Blocker/Blocker104Jobs'
import { Blocker104JobRecommendation } from './Blocker/Blocker104JobRecommendation'
import { Blocker1111Companies } from './Blocker/Blocker1111Companies'
import { Blocker1111Jobs } from './Blocker/Blocker1111Jobs'
import { Blocker518Jobs } from './Blocker/Blocker518Jobs'
import { BlockerYouratorCompanies } from './Blocker/BlockerYouratorCompanies'
import { BlockerYouratorCompany } from './Blocker/BlockerYouratorCompany'
import { BlockerYouratorEventCompanies } from './Blocker/BlockerYouratorEventCompanies'
import { BlockerYouratorEventJobs } from './Blocker/BlockerYouratorEventJobs'
import { BlockerYouratorJobs } from './Blocker/BlockerYouratorJobs'
import { type PlatformName, detectPagePlatform } from './platform'
import { Blocker104Company } from './Blocker/Blocker104Company'
import { Blocker104CompanyRecommendation } from './Blocker/Blocker104CompanyRecommendation'
import { Blocker518JobSimilar } from './Blocker/Blocker518JobSimilar'
import { Blocker518Company } from './Blocker/Blocker518Company'
import { Blocker518CompanyRecommendation } from './Blocker/Blocker518CompanyRecommendation'
import { Blocker1111CompanySimilar } from './Blocker/Blocker1111CompanySimilar'
import { Blocker1111Company } from './Blocker/Blocker1111Company'
import { Blocker1111JobSimilar } from './Blocker/Blocker1111JobSimilar'
import { BlockerYouratorJob } from './Blocker/BlockerYouratorJob'
import { BlockerChickptJob } from './Blocker/BlockerChickptJob'
import { BlockerChickptCompany } from './Blocker/BlockerChickptCompany'
import { BlockerChickptJobRecommendation } from './Blocker/BlockerChickptJobRecommendation'
import { cakeresumeBlockers } from './Blocker/blockerCakeresume'

export class BlockerManager {
  private readonly blockers: Blocker[] = []

  constructor () {
    const platformName = detectPagePlatform()
    if (!platformName) throw new Error('Cannot detect platform!')

    const blockersGroup: Partial<Record<PlatformName, Blocker[]>> = {
      cakeresume: cakeresumeBlockers,
    }

    const constructorsGroup: Partial<Record<PlatformName, Array<new () => Blocker>>> = {
      yourator: [
        BlockerYouratorJobs,
        BlockerYouratorJob,
        BlockerYouratorCompanies,
        BlockerYouratorCompany,
        BlockerYouratorEventCompanies,
        BlockerYouratorEventJobs,
      ],
      104: [
        Blocker104Jobs,
        Blocker104JobRecommendation,
        Blocker104Companies,
        Blocker104Company,
        Blocker104CompanyRecommendation,
      ],
      518: [
        Blocker518Jobs,
        Blocker518JobSimilar,
        Blocker518Company,
        Blocker518CompanyRecommendation,
      ],
      1111: [
        Blocker1111Jobs,
        Blocker1111JobSimilar,
        Blocker1111Companies,
        Blocker1111Company,
        Blocker1111CompanySimilar,
      ],
      chickpt: [
        BlockerChickptJob,
        BlockerChickptCompany,
        BlockerChickptJobRecommendation,
      ],
    }

    const blockers = blockersGroup[platformName]
    blockers?.forEach(blocker => {
      this.addBlocker(blocker)
    })

    const constructors = constructorsGroup[platformName]
    constructors?.forEach(Constructor => {
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

  enableDebugger () {
    this.blockers.forEach((blocker) => { blocker.enableDebugger() })
  }
}
