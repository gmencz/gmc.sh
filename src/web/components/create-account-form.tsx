import { yupResolver } from '@hookform/resolvers/yup'
import { createAccount, CreateAccountInputs } from 'api/create-account'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { QueryStatus, useMutation } from 'react-query'
import { ApiError } from 'utils/api-error'
import * as yup from 'yup'
import ErrorAlert from './error-alert'

const schema = yup.object().shape({
  username: yup.string().required('Username is required.'),
  email: yup.string().required('Email is required.').email('Invalid email.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(6, 'Your password must be at least 6 characters long.'),
})

function CreateAccountForm() {
  const router = useRouter()
  const [create, { error, status, reset }] = useMutation(createAccount, {
    onSuccess: () => {
      router.push('/app')
    },
  })

  const {
    register,
    handleSubmit,
    errors,
    clearErrors,
  } = useForm<CreateAccountInputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit = ({ username, email, password }: CreateAccountInputs) => {
    create({ username, email, password })
  }

  const arraifyedErrorFields = Object.keys(errors)

  return (
    <Fragment>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="sr-only">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            placeholder="Username"
            ref={register}
            className={
              !!errors.username
                ? `block w-full shadow-sm focus:ring-red-300 focus:border-red-300 sm:text-sm border-red-300 text-red-900 placeholder-red-300 rounded-md`
                : `block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md`
            }
          />
        </div>

        <div>
          <label htmlFor="mobile-or-email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            placeholder="Email"
            ref={register}
            className={
              !!errors.email
                ? `block w-full shadow-sm focus:ring-red-300 focus:border-red-300 sm:text-sm border-red-300 text-red-900 placeholder-red-300 rounded-md`
                : `block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md`
            }
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
            placeholder="Password"
            autoComplete="current-password"
            ref={register}
            className={
              !!errors.password
                ? `block w-full shadow-sm focus:ring-red-300 focus:border-red-300 sm:text-sm border-red-300 text-red-900 placeholder-red-300 rounded-md`
                : `block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md`
            }
          />
        </div>

        <div>
          <button
            disabled={status === QueryStatus.Loading}
            type="submit"
            className="disabled:cursor-not-allowed disabled:opacity-60 relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
            Create account
            {status === QueryStatus.Loading && (
              <Fragment>
                <span className="sr-only">loading...</span>
                <svg
                  className="animate-spin ml-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  role="alert"
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
              </Fragment>
            )}
          </button>
        </div>
      </form>
      <ErrorAlert
        isOpen={arraifyedErrorFields.length > 0}
        onClose={() => clearErrors()}
      >
        <Fragment>
          <h3 className="text-sm font-medium text-red-800">
            There were {arraifyedErrorFields.length} errors with your submission
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc pl-5 space-y-1">
              {arraifyedErrorFields.map(errorField => (
                <li key={errorField}>{errors[errorField].message}</li>
              ))}
            </ul>
          </div>
        </Fragment>
      </ErrorAlert>
      {error instanceof ApiError && (
        <ErrorAlert isOpen={!!error} onClose={() => reset()}>
          <Fragment>
            <h3 className="text-sm font-medium text-red-800">
              There was an error creating your account
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error.error.message}</p>
            </div>
          </Fragment>
        </ErrorAlert>
      )}
    </Fragment>
  )
}

export default CreateAccountForm
