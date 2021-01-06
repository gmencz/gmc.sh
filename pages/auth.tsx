import Image from 'next/image'

function Login() {
  return (
    <div className="container mx-auto py-8 flex items-center flex-col justify-center min-h-screen">
      <Image src="/logo.svg" width={100} height={100} priority />
      <div className="flex mt-8">
        <a
          className="inline-flex mr-4 items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          href="/api/login"
        >
          Login
        </a>
        <a
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          href="/api/login?screen_hint=signup"
        >
          Register
        </a>
      </div>
    </div>
  )
}

export default Login
