import { type Nullish } from '../types/Nullish'

export type BlockMethod = 'opacity' | 'blur' | 'hide'

export const blockMethods: BlockMethod[] = ['opacity', 'blur', 'hide']

export function formatBlockMethod (blockMethod: Nullish<BlockMethod>) {
  if (!blockMethod) return null
  return {
    opacity: '淡化',
    blur: '模糊',
    hide: '隱藏',
  }[blockMethod] ?? blockMethod
}
