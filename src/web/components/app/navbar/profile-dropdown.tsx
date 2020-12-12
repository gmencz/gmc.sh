import { V1ApiTypes } from '@gmcsh/shared'
import { Transition } from '@headlessui/react'
import { useDialog } from 'hooks/use-dialog'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { meKey } from 'utils/react-query-keys'

function NavbarProfileDropdown() {
  const { data: me } = useQuery<V1ApiTypes.MeResponse>(meKey)

  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const { ref: dropdownRef } = useDialog({
    isOpen: showProfileDropdown,
    onClose: () => setShowProfileDropdown(false),
  })

  return (
    <div className="ml-4 relative flex-shrink-0">
      <div>
        <button
          className="bg-indigo-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
          id="user-menu"
          aria-haspopup="true"
          onClick={() => setShowProfileDropdown(true)}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full object-cover"
            src={me?.profilePicture}
            alt=""
          />
        </button>
      </div>

      <div ref={dropdownRef}>
        <Transition
          show={showProfileDropdown}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {ref => (
            <div
              ref={ref}
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                View Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Logout
              </a>
            </div>
          )}
        </Transition>
      </div>
    </div>
  )
}

export default NavbarProfileDropdown
