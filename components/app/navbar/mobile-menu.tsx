type NavbarMobileMenuProps = {
  isOpen: boolean
}

function NavbarMobileMenu({ isOpen }: NavbarMobileMenuProps) {
  return (
    <div className={isOpen ? 'block' : 'hidden lg:hidden'}>
      <div className="px-2 pt-2 pb-3">
        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-800"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600"
        >
          Support
        </a>
      </div>
      <div className="pt-4 pb-3 border-t border-indigo-800">
        <div className="px-2">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600"
          >
            Your Profile
          </a>
          <a
            href="#"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600"
          >
            Settings
          </a>
          <a
            href="#"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600"
          >
            Sign out
          </a>
        </div>
      </div>
    </div>
  )
}

export default NavbarMobileMenu
