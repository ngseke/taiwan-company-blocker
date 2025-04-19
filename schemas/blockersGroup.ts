import { z } from 'zod'
import { platformName } from './platformName'
import { blocker } from './blocker'

export const blockersGroup = z.record(platformName, z.array(blocker))

export type BlockersGroup = z.infer<typeof blockersGroup>
