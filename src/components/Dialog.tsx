import { type PropsWithChildren, type SyntheticEvent, useLayoutEffect, useRef } from 'react'
import { useScrollLock } from '../hooks/useScrollLock'

type DialogProps = PropsWithChildren<{
  width?: string
  open?: boolean
  closeOnClickOutside?: boolean
  onClose?: () => void
}>

export function Dialog ({
  width = '420px',
  open,
  closeOnClickOutside,
  onClose,
  children,
}: DialogProps) {
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
      className="max-h-full overflow-auto border-none bg-transparent p-4 outline-none backdrop:bg-neutral-900/70"
      onClick={handleClickDialog}
      onClose={onClose}
    >
      <div
        className="max-h-full max-w-full rounded-xl border border-neutral-800 bg-neutral-900 p-5 text-neutral-300 shadow-2xl"
        style={{ width }}
      >
        {children}
      </div>
    </dialog>
  )
}
