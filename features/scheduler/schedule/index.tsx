import ConfirmDialog from 'components/confirm-dialog'
import {
  format,
  parse,
  parseISO,
  setDay,
  isBefore,
  getDay,
  set,
  getDate,
  getYear,
  getMonth,
  compareAsc,
  differenceInMinutes,
} from 'date-fns'
import {
  ScheduleQuery,
  useAddTasksToScheduleMutation,
  useDeleteScheduleTaskMutation,
  useScheduleQuery,
  useUpdateScheduleTaskMutation,
  useUpdateScheduleUserSubscriptionMutation,
} from 'generated/graphql'
import { ClientError } from 'graphql-request'
import { useApi } from 'hooks/use-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import monthsMappings from 'utils/months-mappings'
import { TimeIcon, capitalizeFirstLetter } from '../create-schedule-form/step-2'
import StepTwoNewTask, {
  getEpochDate,
} from '../create-schedule-form/step-2-new-task'

function SchedulerSchedule() {
  const { addToast } = useToasts()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { id: scheduleId } = router.query
  const { client, isReady } = useApi()
  const { data, status: scheduleQueryStatus } = useScheduleQuery<
    ScheduleQuery,
    ClientError
  >(
    client,
    {
      id: scheduleId as string,
    },
    {
      enabled: isReady,
      staleTime: Infinity,
      onError: error => {
        addToast(
          <h3 className="text-sm font-medium text-red-800">{error.message}</h3>,
          { appearance: 'error' },
        )
      },
    },
  )

  useEffect(() => {
    let notificationTimeout: null | NodeJS.Timeout = null
    if (data) {
      // Check that the user is subscribed to notifications
      // before proceeding.
      if (
        !data.schedule_by_pk?.user_is_subscribed ||
        !('Notification' in window)
      ) {
        return
      }

      // Map all the tasks into an array.
      const tasks = data.schedule_by_pk.days.flatMap(day =>
        day.tasks.map(task => task),
      )

      // Check that there are tasks before proceeding.
      if (tasks.length === 0) {
        return
      }

      const currentDate = new Date()

      // Filter out the tasks which have already happened
      const upcomingTasks = tasks.filter(task => {
        const taskStartDate = parseISO(task.start_time)
        const taskWeekDay = getDay(taskStartDate)
        const currentDateWeekDay = getDay(currentDate)
        if (taskWeekDay < currentDateWeekDay) {
          return false
        }

        const comparableCurrentDate = set(currentDate, {
          year: getYear(taskStartDate),
          date: getDate(taskStartDate),
          month: getMonth(taskStartDate),
        })

        return isBefore(comparableCurrentDate, taskStartDate)
      })

      const firstUpcomingTask = upcomingTasks.sort((a, b) => {
        const aStartDate = parseISO(a.start_time)
        const bStartDate = parseISO(b.start_time)
        return compareAsc(aStartDate, bStartDate)
      })[0]

      const taskStartDate = parseISO(firstUpcomingTask.start_time)
      const comparableCurrentDate = set(currentDate, {
        year: getYear(taskStartDate),
        date: getDate(taskStartDate),
        month: getMonth(taskStartDate),
      })

      const minutesUntilTask = differenceInMinutes(
        taskStartDate,
        comparableCurrentDate,
      )

      // Send first notification 5 minutes before the task
      // For now we will use the static value of "5" minutes.
      // The idea is that in the future, the user will be able
      // to configure this value.
      let notificationMs = minutesUntilTask * 60 * 1000 - 5 * 60 * 1000
      if (minutesUntilTask < 5) {
        // Send notification instantly
        notificationMs = 1
      }

      notificationTimeout = setTimeout(() => {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(data.schedule_by_pk?.title as string, {
              body: `You have to ${firstUpcomingTask.description} in around 5 minutes!`,
              requireInteraction: true,
            })
          }
        })
      }, notificationMs)
    }

    return () => {
      if (notificationTimeout) {
        clearTimeout(notificationTimeout)
      }
    }
  }, [data])

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
  } = useUpdateScheduleUserSubscriptionMutation<ClientError>(client, {
    onError: error => {
      addToast(
        <h3 className="text-sm font-medium text-red-800">{error.message}</h3>,
        { appearance: 'error' },
      )
    },
    onSuccess: async ({ update_schedule_by_pk }) => {
      const queryKey = ['Schedule', { id: update_schedule_by_pk?.id }]
      const staleSchedule = queryClient.getQueryData<ScheduleQuery>(queryKey)

      if (staleSchedule) {
        queryClient.setQueryData(queryKey, {
          ...staleSchedule,
          schedule_by_pk: {
            ...staleSchedule.schedule_by_pk,
            user_is_subscribed: update_schedule_by_pk?.user_is_subscribed,
            updated_at: update_schedule_by_pk?.updated_at,
          },
        })
      }

      setShowNotificationsEnabledInfo(false)
      setShowNotificationsDisabledInfo(false)

      if (update_schedule_by_pk?.user_is_subscribed) {
        // Ask the user for permission to send notifications.
        if (!('Notification' in window)) {
          addToast(
            <h3 className="text-sm font-medium text-red-800">
              This browser does not support desktop notifications, we recommend
              using a modern browser such as Google Chrome or Mozilla Firefox.
            </h3>,
            { appearance: 'error' },
          )
        } else {
          const permission = await Notification.requestPermission()
          if (permission === 'granted') {
            addToast(
              <h3 className="text-sm font-medium text-green-800">
                Notifications for the schedule{' '}
                <span className="italic">{data?.schedule_by_pk?.title}</span>{' '}
                have been turned on.
              </h3>,
              { appearance: 'success' },
            )
          } else {
            addToast(
              <h3 className="text-sm font-medium text-green-800">
                You will not receive desktop notifications for any schedule as
                you did not allow them.
              </h3>,
              { appearance: 'warning' },
            )
          }
        }
      } else {
        addToast(
          <h3 className="text-sm font-medium text-green-800">
            Notifications for the schedule{' '}
            <span className="italic">{data?.schedule_by_pk?.title}</span> have
            been turned off.
          </h3>,
          { appearance: 'success' },
        )
      }
    },
  })

  const {
    mutate: addTasks,
    status: addTasksStatus,
  } = useAddTasksToScheduleMutation<ClientError>(client, {
    onError: error => {
      addToast(
        <h3 className="text-sm font-medium text-red-800">{error.message}</h3>,
        { appearance: 'error' },
      )
    },
    onSuccess: ({ insert_schedule_day_task }) => {
      const queryKey = ['Schedule', { id: scheduleId }]
      const staleSchedule = queryClient.getQueryData<ScheduleQuery>(queryKey)

      if (staleSchedule) {
        const updatedScheduleDays = staleSchedule.schedule_by_pk?.days.map(
          day => {
            const task = insert_schedule_day_task?.returning.find(
              task => task.schedule_day?.id === day.id,
            )

            if (task) {
              return {
                ...day,
                tasks_aggregate: task.schedule_day?.tasks_aggregate,
                tasks: task.schedule_day?.tasks,
              }
            }

            return day
          },
        )

        queryClient.setQueryData(queryKey, {
          ...staleSchedule,
          schedule_by_pk: {
            ...staleSchedule.schedule_by_pk,
            days: updatedScheduleDays,
          },
        })
      }

      if (insert_schedule_day_task?.affected_rows === 1) {
        addToast(
          <h3 className="text-sm font-medium text-green-800">
            The new task has been assigned to the schedule.
          </h3>,
          { appearance: 'success' },
        )
      } else {
        addToast(
          <h3 className="text-sm font-medium text-green-800">
            The {insert_schedule_day_task?.affected_rows} new tasks have been
            assigned to the schedule.
          </h3>,
          { appearance: 'success' },
        )
      }
    },
  })

  const {
    mutate: updateTask,
    status: updateTaskStatus,
  } = useUpdateScheduleTaskMutation<ClientError>(client, {
    onError: error => {
      addToast(
        <h3 className="text-sm font-medium text-red-800">{error.message}</h3>,
        { appearance: 'error' },
      )
    },
    onSuccess: ({ update_schedule_day_task_by_pk }) => {
      const queryKey = ['Schedule', { id: scheduleId }]
      const staleSchedule = queryClient.getQueryData<ScheduleQuery>(queryKey)

      if (staleSchedule) {
        const updatedScheduleDays = staleSchedule.schedule_by_pk?.days.map(
          day => {
            if (day.id !== update_schedule_day_task_by_pk?.schedule_day_id) {
              return day
            }

            const updatedTasks = day.tasks.map(task => {
              if (task.id === update_schedule_day_task_by_pk.id) {
                return {
                  ...task,
                  description: update_schedule_day_task_by_pk.description,
                  start_time: update_schedule_day_task_by_pk.start_time,
                  end_time: update_schedule_day_task_by_pk.end_time,
                }
              }

              return task
            })

            return {
              ...day,
              tasks: updatedTasks,
            }
          },
        )

        queryClient.setQueryData(queryKey, {
          ...staleSchedule,
          schedule_by_pk: {
            ...staleSchedule.schedule_by_pk,
            days: updatedScheduleDays,
          },
        })

        addToast(
          <h3 className="text-sm font-medium text-green-800">
            Your changes were saved successfully.
          </h3>,
          { appearance: 'success' },
        )
      }
    },
  })

  const {
    mutate: deleteTask,
    status: deleteTaskStatus,
  } = useDeleteScheduleTaskMutation<ClientError>(client, {
    onError: error => {
      addToast(
        <h3 className="text-sm font-medium text-red-800">{error.message}</h3>,
        { appearance: 'error' },
      )
    },
    onSuccess: ({ delete_schedule_day_task_by_pk }) => {
      const queryKey = ['Schedule', { id: scheduleId }]
      const staleSchedule = queryClient.getQueryData<ScheduleQuery>(queryKey)

      if (staleSchedule) {
        const updatedScheduleDays = staleSchedule.schedule_by_pk?.days.map(
          day => {
            if (day.id !== delete_schedule_day_task_by_pk?.schedule_day_id) {
              return day
            }

            const updatedTasks = day.tasks.filter(
              task => task.id !== delete_schedule_day_task_by_pk.id,
            )

            return {
              ...day,
              tasks: updatedTasks,
              tasks_aggregate: {
                aggregate: {
                  count: updatedTasks.length,
                },
              },
            }
          },
        )

        queryClient.setQueryData(queryKey, {
          ...staleSchedule,
          schedule_by_pk: {
            ...staleSchedule.schedule_by_pk,
            days: updatedScheduleDays,
          },
        })

        addToast(
          <h3 className="text-sm font-medium text-green-800">
            The task was deleted successfully.
          </h3>,
          { appearance: 'success' },
        )
      }
    },
    onSettled: () => {
      setDeletingId(null)
    },
  })

  const enableNotifications = () => {
    mutate({
      id: scheduleId as string,
      isUserSubscribed: true,
    })
  }

  const tasksCount = data?.schedule_by_pk?.days.reduce(
    (count, day) => count + (day.tasks_aggregate.aggregate?.count || 0),
    0,
  )

  const [isEditVisible, setIsEditVisible] = useState(false)
  const [editingId, setEditingId] = useState<null | string>(null)
  const [deletingId, setDeletingId] = useState<null | string>(null)
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <main className="flex-1 relative focus:outline-none" tabIndex={-1}>
        <div className="py-2">
          <div className="xl:grid xl:grid-cols-3">
            <div className="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
              <div>
                <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-4">
                  {(scheduleQueryStatus === 'idle' ||
                    scheduleQueryStatus === 'loading') && (
                    <div className="flex-1">
                      <span className="sr-only">
                        loading schedule details...
                      </span>
                      <div className="flex animate-pulse flex-col">
                        <div className="block rounded-full bg-gray-200 h-5"></div>
                      </div>
                      <div className="mt-2">
                        <div className="flex animate-pulse flex-col mt-3">
                          <div className="block rounded-full bg-gray-200 h-4"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {scheduleQueryStatus === 'success' && data && (
                    <>
                      <div>
                        <h1 className="text-xl font-bold text-gray-900">
                          {data?.schedule_by_pk?.title}
                        </h1>
                        <div className="mt-2">
                          <p className="mt-2 text-sm text-gray-500">
                            Created by{' '}
                            <Link href="/">
                              <a className="font-medium text-gray-900">
                                {data?.schedule_by_pk?.user?.name}
                              </a>
                            </Link>
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col md:mt-0">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => setIsVisible(true)}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            New task
                          </button>

                          {data?.schedule_by_pk?.user_is_subscribed ? (
                            <button
                              onClick={() =>
                                setShowNotificationsDisabledInfo(true)
                              }
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              {/* Heroicon name: bell */}
                              <svg
                                className="-ml-1 mr-2 h-5 w-5 text-red-600"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                              </svg>
                              <span>Turn notifications off</span>
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                setShowNotificationsEnabledInfo(true)
                              }
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
                              <span>Turn notifications on</span>
                            </button>
                          )}
                        </div>
                        <StepTwoNewTask
                          position="left"
                          leaveEvents={['escape']}
                          loading={addTasksStatus === 'loading'}
                          onSubmit={({
                            description,
                            startTime,
                            endTime,
                            chosenWeekDays,
                          }) => {
                            const chosenDays =
                              data?.schedule_by_pk?.days.filter(day =>
                                chosenWeekDays.includes(
                                  capitalizeFirstLetter(day.week_day),
                                ),
                              ) || []

                            addTasks({
                              tasks: chosenDays.map(day => {
                                const parsedStart = parse(
                                  startTime,
                                  'HH:mm',
                                  getEpochDate(),
                                )

                                if (endTime) {
                                  const parsedEnd = parse(
                                    endTime,
                                    'HH:mm',
                                    getEpochDate(),
                                  )

                                  return {
                                    schedule_day_id: day.id,
                                    description,
                                    start_time: setDay(
                                      parsedStart,
                                      monthsMappings[
                                        capitalizeFirstLetter(day.week_day)
                                      ],
                                    ).toISOString(),
                                    end_time: setDay(
                                      parsedEnd,
                                      monthsMappings[
                                        capitalizeFirstLetter(day.week_day)
                                      ],
                                    ).toISOString(),
                                  }
                                }

                                return {
                                  schedule_day_id: day.id,
                                  description,
                                  start_time: setDay(
                                    parsedStart,
                                    monthsMappings[
                                      capitalizeFirstLetter(day.week_day)
                                    ],
                                  ).toISOString(),
                                }
                              }),
                            })
                          }}
                          onClose={() => setIsVisible(false)}
                          isOpen={isVisible || addTasksStatus === 'loading'}
                          weekDays={
                            data?.schedule_by_pk?.days.map(day =>
                              capitalizeFirstLetter(day.week_day),
                            ) || []
                          }
                        />
                      </div>
                    </>
                  )}
                </div>

                {scheduleQueryStatus === 'success' && data && (
                  <aside className="mt-8 xl:hidden">
                    <h2 className="sr-only">Details</h2>
                    <div className="space-y-5">
                      <div className="flex items-center space-x-2">
                        {data?.schedule_by_pk?.active ? (
                          <>
                            <svg
                              className="h-5 w-5 text-green-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700 text-sm font-medium">
                              Active
                            </span>
                          </>
                        ) : (
                          <>
                            <svg
                              className="h-5 w-5 text-red-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-red-700 text-sm font-medium">
                              Inactive
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                        <span className="text-gray-900 text-sm font-medium">
                          {tasksCount} tasks assigned
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {data?.schedule_by_pk?.user_is_subscribed ? (
                          <>
                            <svg
                              className="h-5 w-5 text-green-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            <span className="text-green-700 text-sm font-medium">
                              Notifications on
                            </span>
                          </>
                        ) : (
                          <>
                            <svg
                              className="h-5 w-5 text-red-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            <span className="text-red-700 text-sm font-medium">
                              Notifications off
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* Heroicon name: calendar */}
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-900 text-sm font-medium">
                          Created on{' '}
                          <time dateTime={data?.schedule_by_pk?.created_at}>
                            {format(
                              parseISO(
                                data?.schedule_by_pk?.created_at as string,
                              ),
                              "MMM' 'd', 'y",
                            )}
                          </time>
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* Heroicon name: calendar */}
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-900 text-sm font-medium">
                          Updated on{' '}
                          <time dateTime={data?.schedule_by_pk?.updated_at}>
                            {format(
                              parseISO(
                                data?.schedule_by_pk?.updated_at as string,
                              ),
                              "MMM' 'd', 'y",
                            )}
                          </time>
                        </span>
                      </div>
                    </div>
                  </aside>
                )}

                <section>
                  {showNotificationsEnabledInfo && (
                    <div className="border-b border-gray-200 py-3 xl:py-6">
                      <h2 className="sr-only">Notifications explained</h2>
                      <div className="prose max-w-none">
                        <p>
                          By enabling notifications for this schedule, you will
                          get desktop notifications{' '}
                          <strong>
                            as long as you have this schedule open on the app
                          </strong>{' '}
                          (you can leave it open in another tab) so you
                          don&apos;t forget about any of the tasks you assigned.
                        </p>
                        <p>
                          At the moment we only support desktop notifications
                          but in the near future we plan to allow you to opt-in
                          to iOS and Android notifications as well as reminder
                          emails.
                        </p>
                        <p>
                          Once enabled,{' '}
                          <strong>
                            your browser may ask you to allow notifications from
                            this app
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
                          onClick={enableNotifications}
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
                    <div className="border-b border-gray-200 py-3 xl:py-6">
                      <h2 className="sr-only">Notifications disabled alert</h2>
                      <div className="prose max-w-none">
                        <p>
                          By disabling notifications, you will stop getting
                          desktop notifications from our app{' '}
                          <strong>for this schedule,</strong> we do not
                          recommend this as you may forget about the tasks you
                          assigned to the schedule.
                        </p>
                      </div>
                      <div className="mt-4 flex">
                        <button
                          disabled={status === 'loading'}
                          onClick={() =>
                            setShowNotificationsDisabledInfo(false)
                          }
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

                  {(scheduleQueryStatus === 'idle' ||
                    scheduleQueryStatus === 'loading') && (
                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                      <div className="flex animate-pulse flex-col">
                        <div className="block rounded-full bg-gray-200 h-5"></div>
                        <div className="block rounded-full mt-2 bg-gray-200 h-4"></div>
                      </div>
                      <div className="flex animate-pulse flex-col">
                        <div className="block rounded-full bg-gray-200 h-5"></div>
                        <div className="block rounded-full mt-2 bg-gray-200 h-4"></div>
                      </div>
                      <div className="flex animate-pulse flex-col">
                        <div className="block rounded-full bg-gray-200 h-5"></div>
                        <div className="block rounded-full mt-2 bg-gray-200 h-4"></div>
                      </div>
                      <div className="flex animate-pulse flex-col">
                        <div className="block rounded-full bg-gray-200 h-5"></div>
                        <div className="block rounded-full mt-2 bg-gray-200 h-4"></div>
                      </div>
                      <div className="flex animate-pulse flex-col">
                        <div className="block rounded-full bg-gray-200 h-5"></div>
                        <div className="block rounded-full mt-2 bg-gray-200 h-4"></div>
                      </div>
                      <div className="flex animate-pulse flex-col">
                        <div className="block rounded-full bg-gray-200 h-5"></div>
                        <div className="block rounded-full mt-2 bg-gray-200 h-4"></div>
                      </div>
                      <div className="flex animate-pulse flex-col">
                        <div className="block rounded-full bg-gray-200 h-5"></div>
                        <div className="block rounded-full mt-2 bg-gray-200 h-4"></div>
                      </div>
                      <div className="flex animate-pulse flex-col">
                        <div className="block rounded-full bg-gray-200 h-5"></div>
                        <div className="block rounded-full mt-2 bg-gray-200 h-4"></div>
                      </div>
                    </div>
                  )}

                  {scheduleQueryStatus === 'success' && data && (
                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                      {data?.schedule_by_pk?.days.map((day, index) => (
                        <div
                          key={day.id}
                          className={
                            index === 0
                              ? 'sm:grid sm:grid-cols-2 sm:gap-4 sm:items-start pt-5 xl:pt-0'
                              : 'sm:grid sm:grid-cols-2 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'
                          }
                        >
                          <div className="sm:col-span-2">
                            <div className="mb-3">
                              <span className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 capitalize">
                                {day.week_day}
                              </span>
                            </div>
                            <div className="flow-root">
                              <ul className="sm:-mb-8">
                                {day.tasks.length > 0 ? (
                                  day.tasks.map((task, index, weekTasksRef) => (
                                    <li key={task.id}>
                                      <div className="relative pb-8">
                                        {index < weekTasksRef.length - 1 && (
                                          <span
                                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                            aria-hidden="true"
                                          ></span>
                                        )}
                                        <div className="pt-0.5 relative flex space-x-3">
                                          <div>
                                            <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center">
                                              <TimeIcon
                                                date={parseISO(task.start_time)}
                                              />
                                            </span>
                                          </div>
                                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                            <div>
                                              <p className="text-sm text-gray-500">
                                                {task.description}
                                              </p>
                                            </div>
                                            <div className="flex space-x-4 items-center text-right text-sm whitespace-nowrap text-gray-500">
                                              <span>
                                                {task.end_time ? (
                                                  <>
                                                    From{' '}
                                                    <time
                                                      dateTime={task.start_time}
                                                    >
                                                      {format(
                                                        parseISO(
                                                          task.start_time,
                                                        ),
                                                        "hh:mm' 'a",
                                                      )}{' '}
                                                      to{' '}
                                                      <time
                                                        dateTime={task.end_time}
                                                      >
                                                        {format(
                                                          parseISO(
                                                            task.end_time,
                                                          ),
                                                          "hh:mm' 'a",
                                                        )}
                                                      </time>
                                                    </time>
                                                  </>
                                                ) : (
                                                  <time
                                                    dateTime={task.start_time}
                                                  >
                                                    {format(
                                                      parseISO(task.start_time),
                                                      "hh:mm' 'a",
                                                    )}
                                                  </time>
                                                )}
                                              </span>

                                              <div className="flex space-x-2">
                                                <button
                                                  onClick={() => {
                                                    setIsEditVisible(
                                                      visible => !visible,
                                                    )
                                                    setEditingId(task.id)
                                                  }}
                                                  type="button"
                                                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                  <svg
                                                    className="h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                  >
                                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                    <path
                                                      fillRule="evenodd"
                                                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                  <span className="sr-only">
                                                    Edit task
                                                  </span>
                                                </button>
                                                <button
                                                  type="button"
                                                  className="inline-flex disabled:cursor-not-allowed disabled:opacity-60 items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                  onClick={() => {
                                                    setDeletingId(task.id)
                                                  }}
                                                >
                                                  <svg
                                                    className="h-4 w-4 text-red-600"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                  <span className="sr-only">
                                                    Delete task
                                                  </span>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <ConfirmDialog
                                          confirmButtonText="Yes, delete it"
                                          isOpen={deletingId === task.id}
                                          loading={
                                            deleteTaskStatus === 'loading'
                                          }
                                          onClose={() => setDeletingId(null)}
                                          confirmButtonVariant="danger"
                                          leaveEvents={['escape']}
                                          position="right"
                                          onConfirm={() => {
                                            deleteTask({
                                              id: task.id,
                                            })
                                          }}
                                        >
                                          <div className="pt-2 pb-4">
                                            <p className="text-base text-gray-900">
                                              Do you really want to delete this
                                              task?
                                            </p>
                                          </div>
                                        </ConfirmDialog>

                                        <StepTwoNewTask
                                          position="right"
                                          leaveEvents={['escape']}
                                          loading={
                                            updateTaskStatus === 'loading'
                                          }
                                          submitButtonText="Save changes"
                                          initialValues={{
                                            chosenWeekDays: [
                                              capitalizeFirstLetter(
                                                day.week_day,
                                              ),
                                            ],
                                            description: task.description,
                                            endTime: task.end_time
                                              ? format(
                                                  parseISO(task.end_time),
                                                  'HH:mm',
                                                )
                                              : '',
                                            startTime: format(
                                              parseISO(task.start_time),
                                              'HH:mm',
                                            ),
                                          }}
                                          onSubmit={({
                                            description,
                                            startTime,
                                            endTime,
                                          }) => {
                                            const parsedStart = parse(
                                              startTime,
                                              'HH:mm',
                                              getEpochDate(),
                                            )

                                            if (endTime) {
                                              const parsedEnd = parse(
                                                endTime,
                                                'HH:mm',
                                                getEpochDate(),
                                              )

                                              updateTask({
                                                id: task.id,
                                                _set: {
                                                  description,
                                                  start_time: setDay(
                                                    parsedStart,
                                                    monthsMappings[
                                                      capitalizeFirstLetter(
                                                        day.week_day,
                                                      )
                                                    ],
                                                  ).toISOString(),
                                                  end_time: setDay(
                                                    parsedEnd,
                                                    monthsMappings[
                                                      capitalizeFirstLetter(
                                                        day.week_day,
                                                      )
                                                    ],
                                                  ).toISOString(),
                                                },
                                              })
                                            } else {
                                              updateTask({
                                                id: task.id,
                                                _set: {
                                                  description,
                                                  start_time: setDay(
                                                    parsedStart,
                                                    monthsMappings[
                                                      capitalizeFirstLetter(
                                                        day.week_day,
                                                      )
                                                    ],
                                                  ).toISOString(),
                                                  end_time: null,
                                                },
                                              })
                                            }
                                          }}
                                          onClose={() =>
                                            setIsEditVisible(false)
                                          }
                                          isOpen={
                                            (isEditVisible &&
                                              editingId === task.id) ||
                                            (editingId === task.id &&
                                              updateTaskStatus === 'loading')
                                          }
                                          weekDays={
                                            data?.schedule_by_pk?.days.map(
                                              day =>
                                                capitalizeFirstLetter(
                                                  day.week_day,
                                                ),
                                            ) || []
                                          }
                                        />
                                      </div>
                                    </li>
                                  ))
                                ) : (
                                  <li className="pb-8">
                                    <div className="min-w-0 flex-1 flex justify-between space-x-4">
                                      <p className="text-sm text-gray-500">
                                        No tasks for this day
                                      </p>
                                    </div>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </div>

            {(scheduleQueryStatus === 'loading' ||
              scheduleQueryStatus === 'idle') && (
              <aside className="hidden xl:block xl:pl-8 sticky top-10 max-h-0">
                <div className="space-y-5">
                  <div className="flex animate-pulse flex-col">
                    <div className="block rounded-full bg-gray-200 h-5"></div>
                  </div>
                  <div className="flex animate-pulse flex-col">
                    <div className="block rounded-full bg-gray-200 h-5"></div>
                  </div>
                  <div className="flex animate-pulse flex-col">
                    <div className="block rounded-full bg-gray-200 h-5"></div>
                  </div>
                  <div className="flex animate-pulse flex-col">
                    <div className="block rounded-full bg-gray-200 h-5"></div>
                  </div>
                  <div className="flex animate-pulse flex-col">
                    <div className="block rounded-full bg-gray-200 h-5"></div>
                  </div>
                </div>
                <div className="mt-6 border-t border-gray-200 py-6 space-y-5">
                  <div className="flex animate-pulse flex-col">
                    <div className="block rounded-full bg-gray-200 h-5"></div>
                  </div>
                  <div className="flex animate-pulse flex-col">
                    <div className="block rounded-full bg-gray-200 h-5"></div>
                  </div>
                  <div className="flex animate-pulse flex-col">
                    <div className="block rounded-full bg-gray-200 h-5"></div>
                  </div>
                  <div className="flex animate-pulse flex-col">
                    <div className="block rounded-full bg-gray-200 h-5"></div>
                  </div>
                  <div className="flex animate-pulse flex-col">
                    <div className="block rounded-full bg-gray-200 h-5"></div>
                  </div>
                  <div className="flex animate-pulse flex-col">
                    <div className="block rounded-full bg-gray-200 h-5"></div>
                  </div>
                  <div className="flex animate-pulse flex-col">
                    <div className="block rounded-full bg-gray-200 h-5"></div>
                  </div>
                </div>
              </aside>
            )}

            {/* max-h-0 so position sticky works, not a problem because the entire app is wrapped in overflow-hidden */}
            {scheduleQueryStatus === 'success' && data && (
              <aside className="hidden xl:block xl:pl-8 sticky top-10 max-h-0">
                <h2 className="sr-only">Details</h2>
                <div className="space-y-5">
                  <div className="flex items-center space-x-2">
                    {data?.schedule_by_pk?.active ? (
                      <>
                        <svg
                          className="h-5 w-5 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-green-700 text-sm font-medium">
                          Active
                        </span>
                      </>
                    ) : (
                      <svg>
                        <svg
                          className="h-5 w-5 text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-red-700 text-sm font-medium">
                          Inactive
                        </span>
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {data?.schedule_by_pk?.user_is_subscribed ? (
                      <>
                        <svg
                          className="h-5 w-5 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <span className="text-green-700 text-sm font-medium">
                          Notifications enabled
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-5 w-5 text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <span className="text-red-700 text-sm font-medium">
                          Notifications disabled
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                    <span className="text-gray-900 text-sm font-medium">
                      {tasksCount} tasks assigned
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* Heroicon name: calendar */}
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-900 text-sm font-medium">
                      Created on{' '}
                      <time dateTime={data?.schedule_by_pk?.created_at}>
                        {format(
                          parseISO(data?.schedule_by_pk?.created_at as string),
                          "MMM' 'd', 'y",
                        )}
                      </time>
                    </span>
                  </div>
                </div>
                <div className="mt-6 border-t border-gray-200 py-6 space-y-8">
                  <div>
                    <h2 className="text-sm font-medium text-gray-500">Days</h2>
                    <ul className="mt-3 space-y-3">
                      {data?.schedule_by_pk?.days.map(day => (
                        <li className="flex justify-start" key={day.id}>
                          <div className="flex items-center space-x-3">
                            <div className="rounded-full font-semibold w-8 h-8 bg-gray-300 flex items-center justify-center">
                              <span className="sr-only">
                                Tasks assigned for {day.week_day}
                              </span>
                              <span>
                                {day.tasks_aggregate.aggregate?.count}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900 capitalize">
                              {day.week_day}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default SchedulerSchedule
