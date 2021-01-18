import { Transition } from '@headlessui/react'
import useOnLeave from 'hooks/use-on-leave'
import { ReactNode, useEffect } from 'react'

type ConfirmDialogProps = {
  children: ReactNode
  position?: 'left' | 'right'
  confirmButtonText?: string
  confirmButtonVariant?: 'danger' | 'success'
  loading?: boolean
  isOpen: boolean
  onClose: VoidFunction
  onConfirm: VoidFunction
  leaveEvents?: ('click-outside' | 'escape')[]
}

function ConfirmDialog({
  position = 'left',
  confirmButtonText = 'Confirm',
  confirmButtonVariant = 'success',
  leaveEvents = ['click-outside', 'escape'],
  loading,
  isOpen,
  onClose,
  onConfirm,
  children,
}: ConfirmDialogProps) {
  const { ref, isVisible, setIsVisible } = useOnLeave(isOpen, {
    onLeave: onClose,
    events: leaveEvents,
  })

  useEffect(() => {
    if (isVisible !== isOpen) {
      setIsVisible(isOpen)
    }
  }, [isOpen, isVisible, setIsVisible])

  const handleClose = () => {
    onClose()
  }

  return (
    <div className="relative z-10" ref={ref}>
      <Transition
        show={isVisible}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          className={
            position === 'left'
              ? `origin-top-left max-w-sm w-full absolute left-0 mt-2 rounded-md shadow-lg p-4 bg-gray-50 ring-1 ring-black ring-opacity-5 outline-none`
              : `origin-top-right max-w-sm w-full absolute right-0 mt-2 rounded-md shadow-lg p-4 bg-gray-50 ring-1 ring-black ring-opacity-5 outline-none`
          }
        >
          {children}
          <div className="flex">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="inline-flex items-center disabled:cursor-not-allowed disabled:opacity-60 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={onConfirm}
              disabled={loading}
              className={
                confirmButtonVariant === 'success'
                  ? 'ml-2 inline-flex items-center disabled:cursor-not-allowed disabled:opacity-60 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  : 'ml-2 inline-flex items-center disabled:cursor-not-allowed disabled:opacity-60 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              }
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {confirmButtonText}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default ConfirmDialog
