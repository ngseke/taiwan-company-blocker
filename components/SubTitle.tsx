import { IconArrowBadgeRightFilled } from '@tabler/icons-react'
import { ComponentProps } from 'react'

export function SubTitle({ children, ...props }: ComponentProps<'h3'>) {
  return (
    <h3 className="flex items-center gap-1.5 text-lg font-medium text-neutral-300" {...props}>
      <IconArrowBadgeRightFilled className="text-brand" />
      {children}
    </h3>
  )
}
