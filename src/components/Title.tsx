import { type ComponentProps } from 'react'
import { cn } from '../modules/cn'

export function Title ({ className, ...restProps }: ComponentProps<'h2'>) {
  return (
    <h2
      className={cn('text-lg font-medium text-white/60', className)}
      {...restProps}
    />
  )
}
