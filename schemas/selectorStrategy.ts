import { z } from 'zod'

export const selectorTarget = z.enum(['document', 'item'])

const baseStrategy = z.object({
  selectorTarget,
  /** Root element if not provided  */
  selector: z.string().optional(),
})

export const selectorStrategy = z.union([
  z.object({
    ...baseStrategy.shape,
    textType: z.literal('textContent'),
  }),
  z.object({
    ...baseStrategy.shape,
    textType: z.literal('dataset'),
    textKey: z.string(),
  }),
  z.object({
    ...baseStrategy.shape,
    textType: z.literal('attribute'),
    textKey: z.string(),
  }),
])
