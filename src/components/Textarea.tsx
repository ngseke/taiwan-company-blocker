interface TextareaProps {
  label?: string
  value?: string
  onChange?: (value: string) => void
  rows?: number
  readOnly?: boolean
}

export function Textarea ({
  label,
  value,
  onChange,
  rows,
  readOnly,
}: TextareaProps) {
  // https://www.material-tailwind.com/docs/html/textarea
  return (
    <div className="relative w-full min-w-[200px]">
      <textarea
        className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-neutral-800 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-neutral-300 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-neutral-800 focus:border-2 focus:border-neutral-400 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-neutral-50"
        placeholder=" "
        readOnly={readOnly}
        rows={rows}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
      <label className="pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[11px] font-normal leading-tight text-neutral-400 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:border-neutral-800 before:transition-all before:content-['_'] after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:grow after:rounded-tr-md after:border-r after:border-t after:border-neutral-800 after:transition-all after:content-['_'] peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-neutral-400 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:border-neutral-400 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:border-neutral-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-neutral-500">
        {label}
      </label>
    </div>
  )
}
