import { useEffect, useRef } from 'react'

type UseDialogOptions = {
  isOpen: boolean
  onClose: () => void
}

function useDialog({ isOpen, onClose }: UseDialogOptions) {
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

    document.addEventListener('click', listener)
    document.addEventListener('touchstart', listener)
    document.addEventListener('keydown', keyListener)

    return () => {
      document.removeEventListener('click', listener)
      document.removeEventListener('touchstart', listener)
      document.removeEventListener('keydown', keyListener)
    }
  }, [isOpen, onClose])

  return { ref: dialogRef }
}

export { useDialog }
