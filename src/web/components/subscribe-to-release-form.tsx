import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { QueryStatus, useMutation } from 'react-query'
import * as yup from 'yup'
import { ApiError } from '../utils/api-error'
import {
  subscribeToRelease,
  SubscribeToReleaseInputs,
} from '../utils/api/subscribe-to-release'
import ErrorAlert from './error-alert'
import SuccessAlert from './success-alert'

const schema = yup.object().shape({
  subscriberEmail: yup
    .string()
    .required('Please enter your email!')
    .email('Please enter a valid email!'),
})

const SUBSCRIPTION_LIST_ID = 4

function SubscribeToReleaseForm() {
  const [subscribe, { error, status, reset, data }] = useMutation(
    subscribeToRelease,
  )

  const { register, handleSubmit, errors, clearErrors } = useForm<
    Pick<SubscribeToReleaseInputs, 'subscriberEmail'>
  >({
    resolver: yupResolver(schema),
  })

  const onSubmit = ({
    subscriberEmail,
  }: Pick<SubscribeToReleaseInputs, 'subscriberEmail'>) => {
    subscribe({ subscriberEmail, listId: SUBSCRIPTION_LIST_ID })
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3 sm:flex">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="text"
          name="subscriberEmail"
          id="email"
          className="block w-full py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:flex-1 border-gray-300"
          placeholder="Enter your email"
          ref={register}
        />
        <button
          type="submit"
          disabled={status === QueryStatus.Loading}
          className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Notify me
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
      </form>
      <ErrorAlert
        isOpen={!!errors.subscriberEmail}
        onClose={() => clearErrors('subscriberEmail')}
      >
        <Fragment>
          <h3 className="text-sm font-medium text-red-800">
            There was an error with your subscription
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{errors.subscriberEmail?.message}</p>
          </div>
        </Fragment>
      </ErrorAlert>
      {error instanceof ApiError && (
        <ErrorAlert isOpen={!!error} onClose={() => reset()}>
          <Fragment>
            <h3 className="text-sm font-medium text-red-800">
              There was an error with your subscription
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error.error.message}</p>
            </div>
          </Fragment>
        </ErrorAlert>
      )}
      <SuccessAlert
        isOpen={status === QueryStatus.Success}
        onClose={() => reset()}
      >
        <p className="text-sm font-medium text-green-800">
          An email has been sent to{' '}
          <span className="italic">
            {data?.subscriberEmail || 'the provided email'}
          </span>{' '}
          with instructions on how to complete your sign up.
        </p>
      </SuccessAlert>
    </Fragment>
  )
}

export default SubscribeToReleaseForm
