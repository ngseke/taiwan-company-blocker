import { z } from 'zod'
import { blockersGroup } from './blockersGroup'

export const database = z.object({
  blocker: blockersGroup,
})

export type Database = z.infer<typeof database>
