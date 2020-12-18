import { useEffect, useRef } from 'react'

type UseDialogOptions = {
  isOpen: boolean
  onClose: () => void
  options?: {
    disableClickOutside?: boolean
  }
}

function useDialog({ isOpen, onClose, options }: UseDialogOptions) {
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        !isOpen ||
        !dialogRef.current ||
        dialogRef.current.contains(event.target as Node)
      ) {
        return
      }

      onClose()
    }

    const keyListener = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        onClose()
      }
    }

    if (!options?.disableClickOutside) {
      document.addEventListener('click', listener)
      document.addEventListener('touchstart', listener)
    }

    document.addEventListener('keydown', keyListener)

    return () => {
      if (!options?.disableClickOutside) {
        document.removeEventListener('click', listener)
        document.removeEventListener('touchstart', listener)
      }
      document.removeEventListener('keydown', keyListener)
    }
  }, [isOpen, onClose, options?.disableClickOutside])

  return { ref: dialogRef }
}

export { useDialog }
