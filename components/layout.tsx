import { withAuthenticationRequired } from '@auth0/auth0-react'
import { ReactNode, useState } from 'react'
import AuthenticationSpinner from './authentication-spinner'
import ContentWrapper from './content-wrapper'
import Header from './header'
import Sidebar from './sidebar'

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const openMobileSidebar = () => setIsMobileSidebarOpen(true)
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false)

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        onCloseMobileSidebar={closeMobileSidebar}
      />

      <div
        className="flex-1 overflow-auto flex flex-col focus:outline-none"
        tabIndex={0}
      >
        <Header openMobileSidebar={openMobileSidebar} />

        <ContentWrapper>{children}</ContentWrapper>
      </div>
    </div>
  )
}

export default withAuthenticationRequired(Layout, {
  onRedirecting: AuthenticationSpinner,
})
