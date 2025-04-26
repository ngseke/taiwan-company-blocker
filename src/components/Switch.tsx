import { useRef, type PropsWithChildren } from 'react'
import { nanoid } from 'nanoid'

type SwitchProps = PropsWithChildren<{
  checked?: boolean
  onChange?: (value: boolean) => void
}>

export function Switch ({
  checked,
  onChange,
  children,
}: SwitchProps) {
  const id = useRef(nanoid())
  // https://www.material-tailwind.com/docs/html/switch
  return (
    <div className="inline-flex items-center">
      <div className="relative inline-block h-4 w-8 cursor-pointer rounded-full">
        <input
          checked={checked ?? false}
          className="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full bg-neutral-700 transition-colors duration-300 checked:bg-red-500 peer-checked:border-red-500 peer-checked:before:bg-red-500"
          id={id.current}
          type="checkbox"
          onChange={(event) => onChange?.(event.target.checked)}
        />
        <label
          className="absolute -left-1 top-2/4 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-neutral-700 bg-white shadow-md transition-all duration-300 before:absolute before:left-2/4 before:top-2/4 before:block before:h-10 before:w-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-neutral-500 before:opacity-0 before:transition-opacity before:content-['_'] hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-red-500 peer-checked:before:bg-red-500"
          htmlFor={id.current}
        >
          <div
            className="left-2/4 top-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
          />
        </label>
      </div>
      <label
        className="ml-4 mt-px cursor-pointer select-none"
        htmlFor={id.current}
      >
        {children}
      </label>
    </div>
  )
}
