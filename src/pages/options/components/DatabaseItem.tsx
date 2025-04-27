import { type IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { cn } from '../../../modules/cn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ReactNode } from 'react'

export function DatabaseItem ({ icon, active, title, content, action }: {
  icon: IconDefinition
  active?: boolean

  title: ReactNode
  content?: ReactNode
  action?: ReactNode
}) {
  return (
    <div
      className="flex w-full items-center gap-2 rounded-lg p-2 text-start"
    >
      <div
        className={cn('flex w-8 justify-center', { 'text-green-600': active })}
      >
        {/* @ts-expect-error -- Remove Vue */}
        <FontAwesomeIcon icon={icon} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-2">
        <div className={cn('truncate', { 'font-bold text-green-600': active })}>
          {title}
        </div>

        <div className="truncate text-xs text-neutral-500">
          {content}
        </div>
      </div>

      <div className="ml-auto flex">
        {action}
      </div>
    </div>
  )
}
