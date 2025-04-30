import { useRef, type SyntheticEvent, useLayoutEffect } from 'react'
import { useScrollLock } from './useScrollLock'

export function useDialog ({ open, closeOnClickOutside, onClose }: {
  open?: boolean
  closeOnClickOutside?: boolean
  onClose?: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  useScrollLock(open)

  function handleClickDialog (event: SyntheticEvent) {
    if (!closeOnClickOutside) return
    if (event.target !== dialogRef.current) return
    onClose?.()
  }

  useLayoutEffect(() => {
    if (open) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [open])

  return {
    dialogRef,
    handleClickDialog,
  }
}
