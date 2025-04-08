import { ComponentProps } from 'react'

export function Paragraph(props: ComponentProps<'p'>) {
  return <p className="leading-relaxed" {...props} />
}
