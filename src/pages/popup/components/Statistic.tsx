import { type PropsWithChildren } from 'react'
import { cn } from '../../../modules/cn'

export function Statistic ({ name, muted, children, className }: PropsWithChildren<{
  name: string
  muted?: boolean
  className?: string
}>) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="text-neutral-500">{name}</div>

      <div className={cn('text-xl font-medium', { 'text-neutral-600': muted })}>
        {children ?? '-'}
      </div>
    </div>
  )
}
