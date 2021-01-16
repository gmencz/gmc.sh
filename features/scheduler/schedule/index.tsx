import {
  ScheduleQuery,
  useScheduleQuery,
  useUpdateScheduleUserSubscriptionMutation,
} from 'generated/graphql'
import { ClientError } from 'graphql-request'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useToasts } from 'react-toast-notifications'

function SchedulerSchedule() {
  const { addToast } = useToasts()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { id: scheduleId } = router.query
  const { data } = useScheduleQuery<ScheduleQuery, ClientError>(
    {
      id: scheduleId as string,
    },
    {
      staleTime: Infinity,
      onError: error => {
        addToast(
          <h3 className="text-sm font-medium text-red-800">{error.message}</h3>,
          { appearance: 'error' },
        )
      },
    },
  )

  const [
    showNotificationsEnabledInfo,
    setShowNotificationsEnabledInfo,
  ] = useState(false)
  const [
    showNotificationsDisabledInfo,
    setShowNotificationsDisabledInfo,
  ] = useState(false)

  const {
    mutate,
    status,
  } = useUpdateScheduleUserSubscriptionMutation<ClientError>({
    onError: error => {
      addToast(
        <h3 className="text-sm font-medium text-red-800">{error.message}</h3>,
        { appearance: 'error' },
      )
    },
    onSuccess: data => {
      const queryKey = ['Schedule', { id: data.update_schedule_by_pk?.id }]
      const staleSchedule = queryClient.getQueryData<ScheduleQuery>(queryKey)

      if (staleSchedule) {
        queryClient.setQueryData(queryKey, {
          ...staleSchedule,
          schedule_by_pk: {
            ...staleSchedule.schedule_by_pk,
            user_is_subscribed: data.update_schedule_by_pk?.user_is_subscribed,
          },
        })
      }

      setShowNotificationsEnabledInfo(false)
      setShowNotificationsDisabledInfo(false)
    },
  })

  return (
    <>
      <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {data?.schedule_by_pk?.title}
          </h1>
          <div className="mt-2 space-x-2">
            {data?.schedule_by_pk?.active ? (
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Inactive
              </span>
            )}
            {data?.schedule_by_pk?.user_is_subscribed ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Notifications enabled
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Notifications disabled
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0">
          {data?.schedule_by_pk?.user_is_subscribed ? (
            <button
              onClick={() => setShowNotificationsDisabledInfo(true)}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {/* Heroicon name: bell */}
              <svg
                className="-ml-1 mr-2 h-5 w-5  text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <span>Disable notifications</span>
            </button>
          ) : (
            <button
              onClick={() => setShowNotificationsEnabledInfo(true)}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {/* Heroicon name: bell */}
              <svg
                className="-ml-1 mr-2 h-5 w-5  text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <span>Enable notifications</span>
            </button>
          )}
        </div>
      </div>
      {showNotificationsEnabledInfo && (
        <div className="py-3 xl:pt-6 xl:pb-0">
          <h2 className="sr-only">Notifications explained</h2>
          <div className="prose max-w-none">
            <p>
              By enabling notifications for this schedule, you will get desktop
              notifications <strong>as long as you have our app open</strong> so
              you don&apos;t forget about any of the tasks you programmed for
              the schedule.
            </p>
            <p>
              At the moment we only support desktop notifications but in the
              near future we plan to allow you to opt-in to iOS and Android
              notifications as well as reminder emails.
            </p>
            <p>
              Once enabled,{' '}
              <strong>
                your browser may ask you to allow notifications from this app
              </strong>
              , allow them and you should be all set.
            </p>
          </div>
          <div className="mt-4 flex">
            <button
              onClick={() => setShowNotificationsEnabledInfo(false)}
              disabled={status === 'loading'}
              className="inline-flex items-center disabled:cursor-not-allowed disabled:opacity-60 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                mutate({
                  id: scheduleId as string,
                  isUserSubscribed: true,
                })
              }}
              disabled={status === 'loading'}
              className="ml-2 inline-flex disabled:cursor-not-allowed disabled:opacity-60 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {status === 'loading' && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              Enable
            </button>
          </div>
        </div>
      )}

      {showNotificationsDisabledInfo && (
        <div className="py-3 xl:pt-6 xl:pb-0">
          <h2 className="sr-only">Notifications disabled alert</h2>
          <div className="prose max-w-none">
            <p>
              By disabling notifications, you will stop getting desktop
              notifications from our app,{' '}
              <strong>we do not recommend this</strong> as you may forget about
              the tasks you programmed for the schedule.
            </p>
          </div>
          <div className="mt-4 flex">
            <button
              disabled={status === 'loading'}
              onClick={() => setShowNotificationsDisabledInfo(false)}
              className="inline-flex items-center disabled:cursor-not-allowed disabled:opacity-60 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                mutate({
                  id: scheduleId as string,
                  isUserSubscribed: false,
                })
              }}
              disabled={status === 'loading'}
              className="ml-2 inline-flex disabled:cursor-not-allowed disabled:opacity-60 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {status === 'loading' && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              Disable anyway
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default SchedulerSchedule
