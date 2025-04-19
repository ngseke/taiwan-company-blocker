import { type Nullish } from '../../../types/Nullish'
import { type Blocker } from '../schemas/blocker'

export interface Candidate {
  options: Blocker
  itemElementRef: WeakRef<HTMLElement>
  companyName: Nullish<string>
  jobTitle: Nullish<string>
  onClick?: () => void
}
