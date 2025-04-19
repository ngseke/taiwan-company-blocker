import { z } from 'zod'
import { selectorStrategy } from './selectorStrategy'
import { activatorStrategy } from './activatorStrategy'
import { position, positionWithOffset } from './position'

export const blocker = z.object({
  /**
   * Human-readable description.
   */
  description: z.string(),
  exampleUrl: z.union([z.string(), z.array(z.string())]).optional(),
  /**
   * The selector for the candidate items.
   */
  itemsSelector: z.string(),
  /**
   * Determines how the job title is extracted.
   */
  jobTitleStrategy: z.union([selectorStrategy, z.string()]).optional(),
  /**
   * Determines how the company name is extracted.
   */
  companyNameStrategy: z.union([selectorStrategy, z.string()]).optional(),
  /**
   * Specifies the position of the activator.
   */
  activatorPosition: z.union([position, positionWithOffset]).optional(),
  /**
   * Determines how the activator is rendered.
   */
  activatorStrategy: activatorStrategy.optional(),
})

export type Blocker = z.infer<typeof blocker>
