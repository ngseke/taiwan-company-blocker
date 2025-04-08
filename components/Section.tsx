import { PropsWithChildren } from 'react'

export function Section({ title, children }: PropsWithChildren<{
  title: string
}>) {
  return (
    <section className="flex w-full flex-col items-start gap-6">
      <h2 className="text-3xl font-bold">{title}</h2>
      <div className="w-full">
        {children}
      </div>
    </section>
  )
}
