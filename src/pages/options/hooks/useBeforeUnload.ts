import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    tcbBeforeUnloadTokens?: Set<symbol>
  }
}

function updateOnBeforeUnload () {
  window.onbeforeunload = window.tcbBeforeUnloadTokens?.size
    ? () => ''
    : null
}

export function useBeforeUnload (value: boolean) {
  const tokenRef = useRef(Symbol(''))

  useEffect(() => {
    const token = tokenRef.current
    window.tcbBeforeUnloadTokens ??= new Set()

    if (value) {
      window.tcbBeforeUnloadTokens.add(token)
    } else {
      window.tcbBeforeUnloadTokens.delete(token)
    }
    updateOnBeforeUnload()

    return () => {
      window.tcbBeforeUnloadTokens?.delete(token)
      updateOnBeforeUnload()
    }
  }, [value])
}
