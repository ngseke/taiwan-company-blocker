import { z } from 'zod'

export const position = z.union([
  z.literal('top-left'),
  z.literal('top-right'),
  z.literal('bottom-left'),
  z.literal('bottom-right'),
])

export type Position = z.infer<typeof position>

export const positionWithOffset = z.object({
  position,
  offset: z.tuple([z.number(), z.number()]).optional(),
})

export type PositionWithOffset = z.infer<typeof positionWithOffset>
