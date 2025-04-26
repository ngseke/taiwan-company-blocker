import { useEffect, useRef, useState } from 'react'

export function useStyleTag (initialCss: string) {
  const [css, setCss] = useState(initialCss)
  const styleElementRef = useRef<HTMLStyleElement | null>(null)

  useEffect(() => {
    const el = document.createElement('style')
    document.head.appendChild(el)
    styleElementRef.current = el

    return () => {
      document.head.removeChild(el)
    }
  }, [css])

  useEffect(() => {
    if (styleElementRef.current) {
      styleElementRef.current.textContent = css
    }
  }, [css])

  return { css, setCss }
}
