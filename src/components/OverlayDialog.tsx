import { type PropsWithChildren } from 'react'
import { useDialog } from '../hooks/useDialog'

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
  const { dialogRef, handleClickDialog } = useDialog({
    open,
    closeOnClickOutside,
    onClose,
  })

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
