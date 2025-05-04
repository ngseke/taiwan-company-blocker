import { type ComponentProps } from 'react'
import { cn } from '../modules/cn'

export function Divider ({ className, ...restProps }: ComponentProps<'hr'>) {
  return (
    <hr
      className={cn('border-neutral-800', className)}
      {...restProps}
    />
  )
}
