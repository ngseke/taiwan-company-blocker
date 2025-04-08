import { ComponentProps } from 'react'

export function DownloadLink(props: ComponentProps<'a'>) {
  return (
    <a
      className="inline-flex items-center gap-3 rounded-xl bg-zinc-900 p-4 text-lg font-medium hover:bg-zinc-800"
      target="_blank"
      {...props}
    >
    </a>
  )
}
