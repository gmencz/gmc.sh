import Head from 'next/head'
import Image from 'next/image'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { QueryStatus, useMutation } from 'react-query'
import { V1ApiTypes } from '@gmcsh/shared'
import { API_ENDPOINT } from '../utils/constants'
import { ApiError } from '../utils/api-error'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Inputs = {
  username: string
  password: string
}

const schema = yup.object().shape({
  username: yup.string().required('Please enter your username.'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(6, 'Your password must be at least 6 characters long.'),
})

async function signIn({ username, password }: Inputs) {
  const response = await fetch(`${API_ENDPOINT}/v1/auth/sign-in`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      username,
      password,
    }),
  })

  const data = await response.json()

  if (response.status >= 400 && response.status < 600) {
    throw new ApiError(response.status, data as V1ApiTypes.ErrorResponse)
  }

  return data as V1ApiTypes.LoginResponse
}

function SignIn() {
  const router = useRouter()
  const [signInToApp, { error, status }] = useMutation(signIn, {
    onSuccess: () => {
      router.push('/app')
    },
  })

  const { register, handleSubmit, errors } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit = ({ username, password }: Inputs) => {
    signInToApp({ username, password })
  }

  return (
    <Fragment>
      <Head>
        <title>Gmc.sh • Sign in to your account</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <Link href="/">
              <a>
                <Image
                  className="mx-auto h-12 w-auto"
                  src="/logo.svg"
                  alt="Gmc.sh logo"
                  width="55px"
                  height="50px"
                  priority
                />
              </a>
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                start your 14-day free trial
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  ref={register}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  ref={register}
                />
              </div>
            </div>
            <div className="space-y-3">
              {error instanceof ApiError && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {error.error.message}
                </p>
              )}
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errors.username?.message}
              </p>
              <p className="mt-2 text-sm text-red-600" id="password-error">
                {errors.password?.message}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/forgot-password">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <button
                disabled={status === QueryStatus.Loading}
                type="submit"
                className="group relative w-full flex disabled:cursor-not-allowed disabled:opacity-60 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
                {status === QueryStatus.Loading && (
                  <svg
                    className="animate-spin ml-3 h-5 w-5 text-white"
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
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default SignIn
