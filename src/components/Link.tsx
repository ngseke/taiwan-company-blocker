import type { ComponentProps } from 'react'
import { cn } from '../modules/cn'

export function Link ({ className, ...restProps }: ComponentProps<'a'>) {
  return (

    <a
      className={cn('hover:text-neutral-50 duration-100 ', className)}
      rel="noreferrer"
      target="_blank"
      {...restProps}
    />
  )
}
