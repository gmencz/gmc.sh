import { V1ApiTypes } from '@gmcsh/shared'
import { useState } from 'react'
import NavbarLinks from './links'
import NavbarLogo from './logo'
import NavbarMobileMenu from './mobile-menu'
import NavbarMobileMenuButton from './mobile-menu-button'
import NavbarSearch from './search'

type NavbarProps = {
  user: V1ApiTypes.MeResponse
}

function Navbar({ user }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="flex-shrink-0 bg-indigo-600">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <NavbarLogo />

          <NavbarSearch />

          <NavbarMobileMenuButton
            isMobileMenuOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(prevOpen => !prevOpen)}
          />

          <NavbarLinks />
        </div>
      </div>

      <NavbarMobileMenu isOpen={isMobileMenuOpen} />
    </nav>
  )
}

export default Navbar
