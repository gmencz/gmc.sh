import Image from 'next/image'

function NavbarLogo() {
  return (
    <div className="flex items-center px-2 lg:px-0 xl:w-64">
      <div className="flex-shrink-0 flex">
        <Image
          src="/home_navbar_logo.svg"
          alt="Gmc.sh logo"
          width="50px"
          height="50px"
          priority
        />
      </div>
    </div>
  )
}

export default NavbarLogo
