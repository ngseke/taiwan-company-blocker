import { useRef, type PropsWithChildren } from 'react'
import { nanoid } from 'nanoid'

type CheckboxProps = PropsWithChildren<{
  value?: boolean
  onChange?: (value: boolean) => void
}>

export function Checkbox ({
  value,
  onChange,
  children,
}: CheckboxProps) {
  const id = useRef(nanoid())
  // https://www.material-tailwind.com/docs/html/checkbox
  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex cursor-pointer items-center rounded-full p-3"
      >
        <input
          checked={value ?? false}
          className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-neutral-800 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-neutral-500 before:opacity-0 before:transition-opacity before:content-['_'] checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
          id={id.current}
          type="checkbox"
          onChange={(event) => onChange?.(event.target.checked)}
        />
        <div className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            className="h-3.5 w-3.5 fill-current stroke-current stroke-1"
            viewBox="0 0 20 20"
          >
            <path
              clipRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </label>

      {children && (
        <label
          className="ml-1 mt-px cursor-pointer select-none"
          htmlFor={id.current}
        >
          {children}
        </label>
      )}
    </div>

  )
}
