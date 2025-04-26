import { type ComponentProps } from 'react'

export function Card ({ className, ...restProps }: ComponentProps<'div'>) {
  return (
    <div
      className="rounded-lg bg-neutral-900 p-6 shadow-2xl"
      {...restProps}
    />
  )
}
