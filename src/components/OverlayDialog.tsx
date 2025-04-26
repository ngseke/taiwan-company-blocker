import { type PropsWithChildren, type SyntheticEvent, useLayoutEffect, useRef } from 'react'
import { useScrollLock } from '../hooks/useScrollLock'

type OverlayDialogProps = PropsWithChildren<{
  open?: boolean
  closeOnClickOutside?: boolean
  onClose?: () => void
}>

export function OverlayDialog ({
  open,
  closeOnClickOutside,
  onClose,
  children,
}: OverlayDialogProps) {
  // TODO: Extract me into a hook
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

  return (
    <dialog
      ref={dialogRef}
      className="m-0 overflow-auto border-none p-0 outline-none backdrop:bg-neutral-900/50"
      onClick={handleClickDialog}
      onClose={onClose}
    >
      <div className="fixed right-0 top-0 h-full w-[700px] max-w-full">
        {children}
      </div>
    </dialog>
  )
}
