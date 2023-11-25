export type Platform = 'cakeresume' | 'yourator' | '104' | '518' | '1111'

const platformHosts: Record<Platform, string> = {
  cakeresume: 'cakeresume.com',
  yourator: 'yourator.co',
  104: '104.com.tw',
  518: '518.com.tw',
  1111: '1111.com.tw',
}

export function detectPlatform () {
  return Object.entries(platformHosts)
    .find(([_, host]) => location.host.includes(host))?.[0] ?? null
}
