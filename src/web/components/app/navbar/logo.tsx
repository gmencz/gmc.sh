import Image from 'next/image'
import Link from 'next/link'

function NavbarLogo() {
  return (
    <div className="flex items-center px-2 lg:px-0 xl:w-64">
      <div className="flex-shrink-0 flex">
        <Link href="/app">
          <a>
            <Image
              src="/home_navbar_logo.svg"
              alt="Gmc.sh logo"
              width="50px"
              height="50px"
              priority
            />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default NavbarLogo
