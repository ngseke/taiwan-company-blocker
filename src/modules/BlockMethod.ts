import { type Nullish } from '../types/Nullish'

export type BlockMethod = 'opacity' | 'hide'

export const blockMethods: BlockMethod[] = ['opacity', 'hide']

export function formatBlockMethod (blockMethod: Nullish<BlockMethod>) {
  if (!blockMethod) return null
  return {
    opacity: '淡化',
    hide: '隱藏',
  }[blockMethod] ?? blockMethod
}
