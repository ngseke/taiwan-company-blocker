import { type PropsWithChildren } from 'react'
import { useDialog } from '../hooks/useDialog'

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
  const { dialogRef, handleClickDialog } = useDialog({
    open,
    closeOnClickOutside,
    onClose,
  })

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
