import { useId } from 'react'
import { cn } from '../../../modules/cn'

export function EnableSwitch ({ value, onChange, ...restProps }: {
  value: boolean
  onChange: (value: boolean) => void
  'data-testid': string
}) {
  const id = useId()

  return (
    <label
      className="flex cursor-pointer select-none items-center"
      htmlFor={id}
      {...restProps}
    >
      <div className="relative">
        <input
          id={id}
          checked={value}
          className="peer sr-only"
          type="checkbox"
          onChange={(event) => {
            onChange(event.target.checked)
          }}
        />
        <div
          className={cn(
            'h-5 w-14 rounded-full transition-colors duration-300',
            value ? 'bg-red-500' : 'bg-neutral-700'
          )}
        />
        <div
          className="absolute -top-1 left-0 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-300 transition duration-300 peer-checked:translate-x-full"
        >
          <span
            className={cn(
              'h-4 w-4 rounded-full transition-colors duration-300',
              value ? 'bg-red-500' : 'bg-neutral-400'
            )}
          />
        </div>
      </div>
    </label>
  )
}
