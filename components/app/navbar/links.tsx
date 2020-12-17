import Link from 'next/link'
import NavbarProfileDropdown from './profile-dropdown'

function NavbarLinks() {
  return (
    <div className="hidden lg:block lg:w-80">
      <div className="flex items-center justify-end">
        <div className="flex">
          <Link href="/app/analytics">
            <a className="px-3 py-2 rounded-md text-sm font-medium text-indigo-200 hover:text-white">
              Analytics
            </a>
          </Link>
          <Link href="/app/integrations">
            <a className="px-3 py-2 rounded-md text-sm font-medium text-indigo-200 hover:text-white">
              Integrations
            </a>
          </Link>
        </div>

        <NavbarProfileDropdown />
      </div>
    </div>
  )
}

export default NavbarLinks
