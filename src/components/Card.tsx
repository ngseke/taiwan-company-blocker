import { forwardRef, type ComponentProps } from 'react'

export const Card = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  function Card ({ className, ...restProps }, ref) {
    return (
      <div
        ref={ref}
        className="rounded-lg bg-neutral-900 p-6 shadow-2xl"
        {...restProps}
      />
    )
  }
)
