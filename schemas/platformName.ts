import { z } from 'zod'

export const platformName = z.enum([
  'cake',
  'yourator',
  '104',
  '518',
  '1111',
  'chickpt',
  'meetJobs',
  'taiwanJobs',
])

export type PlatformName = z.infer<typeof platformName>

export const platformNames = platformName.options
