import { type Entries } from '../../../types/Entries'
import { type Nullish } from '../../../types/Nullish'

export type PlatformName =
  | 'cakeresume'
  | 'yourator'
  | '104'
  | '518'
  | '1111'
  | 'chickpt'
  | 'meetJobs'
  | 'taiwanJobs'

export const platformNames: readonly PlatformName[] = [
  'cakeresume',
  'yourator',
  '104',
  '518',
  '1111',
  'chickpt',
  'meetJobs',
  'taiwanJobs',
]

export const platformHosts: Record<PlatformName, string> = {
  cakeresume: 'cakeresume.com',
  yourator: 'yourator.co',
  104: '104.com.tw',
  518: '518.com.tw',
  1111: '1111.com.tw',
  chickpt: 'chickpt.com.tw',
  meetJobs: 'meet.jobs',
  taiwanJobs: 'job.taiwanjobs.gov.tw',
}

export function detectPagePlatform () {
  const entries = Object.entries(platformHosts) as Entries<typeof platformHosts>
  return entries
    .find(([_, host]) => location.host.includes(host))?.[0] ?? null
}

export function formatPlatformName (platformName: Nullish<PlatformName>) {
  if (!platformName) return null
  return {
    cakeresume: 'CakeResume',
    yourator: 'Yourator',
    104: '104 人力銀行',
    518: '518 熊班',
    1111: '1111 人力銀行',
    chickpt: '小雞上工',
    meetJobs: 'Meet.jobs',
    taiwanJobs: '台灣就業通',
  }[platformName] ?? platformName
}
