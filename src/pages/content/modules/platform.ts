import { merge } from 'lodash-es'
import { type Entries } from '../../../types/Entries'

export type PlatformName =
  | 'cakeresume'
  | 'yourator'
  | '104'
  | '518'
  | '1111'

export const platformNames: readonly PlatformName[] = [
  'cakeresume',
  'yourator',
  '104',
  '518',
  '1111',
]

export interface Platform {
  companyNamePatterns: string[]
  jobTitlePatterns: string[]
}

export type Platforms = Record<PlatformName, Platform>

export function generateDefaultPlatforms () {
  return platformNames.reduce<Partial<Platforms>>((platforms, name) => ({
    ...platforms,
    [name]: {
      companyNamePatterns: [],
      jobTitlePatterns: [],
    },
  }), {}) as Platforms
}

export function ensurePlatforms (partialPlatforms: Partial<Platforms>) {
  return merge(generateDefaultPlatforms(), partialPlatforms) as Platforms
}

const platformHosts: Record<PlatformName, string> = {
  cakeresume: 'cakeresume.com',
  yourator: 'yourator.co',
  104: '104.com.tw',
  518: '518.com.tw',
  1111: '1111.com.tw',
}

export function detectPagePlatform () {
  const entries = Object.entries(platformHosts) as Entries<typeof platformHosts>
  return entries
    .find(([_, host]) => location.host.includes(host))?.[0] ?? null
}
