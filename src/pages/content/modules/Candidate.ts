import { type Nullish } from '../../../types/Nullish'
import type { CreateBlockerOptions } from './CreateBlockerOptions'

export interface Candidate {
  options: CreateBlockerOptions
  itemElementRef: WeakRef<HTMLElement>
  companyName: Nullish<string>
  jobTitle: Nullish<string>
  onClick?: () => void
}
