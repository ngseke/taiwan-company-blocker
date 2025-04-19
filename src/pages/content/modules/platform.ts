import { type PlatformName } from '../../../../schemas/platformName'
import { type Entries } from '../../../types/Entries'
import { type Nullish } from '../../../types/Nullish'

export const platformHosts: Record<PlatformName, string> = {
  cake: 'cake.me',
  yourator: 'yourator.co',
  104: '104.com.tw',
  518: '518.com.tw',
  1111: '1111.com.tw',
  chickpt: 'chickpt.com.tw',
  meetJobs: 'meet.jobs',
  taiwanJobs: 'taiwanjobs.gov.tw',
}

export function detectPagePlatform () {
  const entries = Object.entries(platformHosts) as Entries<typeof platformHosts>
  return entries
    .find(([_, host]) => location.host.includes(host))?.[0] ?? null
}

export function formatPlatformName (platformName: Nullish<PlatformName>) {
  if (!platformName) return null
  return {
    cake: 'Cake',
    yourator: 'Yourator',
    104: '104 人力銀行',
    518: '518 熊班',
    1111: '1111 人力銀行',
    chickpt: '小雞上工',
    meetJobs: 'Meet.jobs',
    taiwanJobs: '台灣就業通',
  }[platformName] ?? platformName
}
