import { detectPagePlatform, formatPlatformName, platformNames } from './platform'

describe('platform.ts', () => {
  test('detectPagePlatform', () => {
    const mockHost = (host: string) => {
      Object.defineProperty(window, 'location', {
        value: { host },
        writable: true,
      })
    }

    mockHost('')
    expect(detectPagePlatform()).toBeNull()

    mockHost('https://google.com')
    expect(detectPagePlatform()).toBeNull()

    mockHost('https://www.cakeresume.com/companies/ABC/jobs/ABC')
    expect(detectPagePlatform()).toBe('cakeresume')

    mockHost('https://www.yourator.co/companies/ABC/jobs/00000')
    expect(detectPagePlatform()).toBe('yourator')

    mockHost('https://www.104.com.tw/job/00000?jobsource=keyword2Keyword')
    expect(detectPagePlatform()).toBe('104')

    mockHost('https://www.518.com.tw/job-00000.html')
    expect(detectPagePlatform()).toBe('518')

    mockHost('https://www.1111.com.tw/job/00000000/')
    expect(detectPagePlatform()).toBe('1111')

    mockHost('https://chickpt.com.tw/job-00000000000')
    expect(detectPagePlatform()).toBe('chickpt')
  })

  test('formatPlatformName', () => {
    expect(formatPlatformName(null)).toBeNull()
    platformNames.forEach((name) => {
      expect(formatPlatformName(name)).not.toBe('')
      expect(formatPlatformName(name)).not.toBeNull()
    })
  })
})
