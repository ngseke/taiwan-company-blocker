import { z } from 'zod'
import { blockersGroup } from './blockersGroup'

export const database = z.object({
  createdAt: z.string().nullable(),
  version: z.string().nullable(),

  blocker: blockersGroup,
})

export type Database = z.infer<typeof database>
