import { faCircleNotch, type IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cn } from '../modules/cn'
import { type ComponentProps } from 'react'

type IconButtonProps = ComponentProps<'button'> & {
  block?: boolean
  color?: 'default' | 'primary'
  loading?: boolean
  icon: IconDefinition
}

export function IconButton ({
  block,
  color = 'default',
  loading,
  icon,
  className,
  ...restProps
}: IconButtonProps) {
  // https://www.material-tailwind.com/docs/html/button
  return (
    <button
      className={cn(
        'relative select-none whitespace-nowrap rounded-full w-8 h-8 text-xs font-bold uppercase text-neutral-200 shadow-md transition-all hover:shadow-lg focus:shadow-none active:opacity-80 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none inline-flex items-center justify-center',
        {
          'bg-neutral-800 shadow-neutral-800/20 hover:shadow-neutral-800/40': color === 'default',
          'bg-red-500 shadow-red-500/20 hover:shadow-red-500/40': color === 'primary',
          'w-full': block,
        },
        className
      )}
      type="button"
      {...restProps}
    >

      {loading && (
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* @ts-expect-error -- Remove Vue */}
          <FontAwesomeIcon spin icon={faCircleNotch} />
        </span>
      )}

      <span className={cn('inline-flex', loading ? 'opacity-0' : '')}>
        {/* @ts-expect-error -- Remove Vue */}
        <FontAwesomeIcon icon={icon} />
      </span>
    </button>
  )
}
