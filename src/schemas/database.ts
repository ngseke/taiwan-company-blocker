import { z } from 'zod'
import { blockersGroup } from './blockersGroup'

export const database = z.object({
  createdAt: z.string().nullable(),
  blocker: blockersGroup,
})
