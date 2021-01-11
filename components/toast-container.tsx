import { ToastContainerProps } from 'react-toast-notifications'

function ToastContainer({ children }: ToastContainerProps) {
  return (
    <div
      id="toast-container"
      className="max-w-lg fixed top-6 right-6 z-50 space-y-3"
    >
      {children}
    </div>
  )
}

export default ToastContainer
