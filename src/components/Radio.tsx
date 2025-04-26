import { useRef, type PropsWithChildren } from 'react'
import { nanoid } from 'nanoid'

type RadioProps = PropsWithChildren<{
  checked?: boolean
  onChange?: (value: boolean) => void
}>

export function Radio ({
  checked,
  onChange,
  children,
}: RadioProps) {
  const id = useRef(nanoid())

  // https://www.material-tailwind.com/docs/html/radio-button
  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex cursor-pointer items-center rounded-full p-3"
        data-ripple-dark="true"
        htmlFor="html"
      >
        <input
          checked={checked ?? false}
          className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-neutral-700 text-red-500 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-neutral-500 before:opacity-0 before:transition-opacity before:content-['_'] checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
          id={id.current}
          name="type"
          type="radio"
          onChange={(event) => onChange?.(event.target.checked)}
        />
        <div className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-red-500 opacity-0 transition-opacity peer-checked:opacity-100">
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 16 16">
            <circle
              cx="8"
              cy="8"
              data-name="ellipse"
              r="8"
            />
          </svg>
        </div>
      </label>
      {children && (
        <label
          className="ml-1 mt-px cursor-pointer select-none"
          htmlFor={id.current}
        >
          <slot />
        </label>
      )}
    </div>
  )
}
