import { z } from 'zod'

export const activatorStrategy = z.union([
  z.literal('absolute'),
  z.literal('fixed'),
])

export type ActivatorStrategy = z.infer<typeof activatorStrategy>
