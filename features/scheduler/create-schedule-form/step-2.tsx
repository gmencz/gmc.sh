import { format, getHours, parse, setDay } from 'date-fns'
import {
  CreateScheduleMutationVariables,
  Schedule_Day_Week_Day_Enum,
  useCreateScheduleMutation,
} from 'generated/graphql'
import { ClientError } from 'graphql-request'
import { useApi } from 'hooks/use-api'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import monthsMappings from 'utils/months-mappings'
import { FormData } from './step-1'
import StepTwoNewTask, { getEpochDate, NewTask } from './step-2-new-task'

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function TimeIcon({ date, className }: TimeIconProps) {
  const hour = getHours(date)
  const defaultClassName = 'h-5 w-5 text-white'
  const svgClassName = className ?? defaultClassName

  if (hour >= 5 && hour <= 18) {
    return (
      <svg
        className={svgClassName}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    )
  }

  return (
    <svg
      className={svgClassName}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  )
}

type TimeIconProps = {
  date: Date
  className?: string
}

function CreateScheduleFormStepTwo({
  previousStepData,
}: CreateScheduleFormStepTwoProps) {
  const { client } = useApi()
  const { addToast } = useToasts()
  const router = useRouter()
  const { mutate, status } = useCreateScheduleMutation<ClientError>(client, {
    onError: error => {
      addToast(
        <h3 className="text-sm font-medium text-red-800">{error.message}</h3>,
        { appearance: 'error' },
      )
    },
    onSuccess: data => {
      const newScheduleId = data.insert_schedule?.returning[0].id
      router.push(`/scheduler/${newScheduleId}`)
    },
  })

  const [isVisible, setIsVisible] = useState(false)
  const weekDays = Object.keys(previousStepData.days)
    .filter(key => previousStepData.days[key])
    .map(capitalizeFirstLetter)

  const [weekTasks, setWeekTasks] = useState(() =>
    weekDays.reduce<WeekDaysTasks>(
      (acc, day) => ({ ...acc, [capitalizeFirstLetter(day)]: [] }),
      {},
    ),
  )

  const addTask = ({
    description,
    chosenWeekDays,
    startTime,
    endTime,
  }: NewTask) => {
    setWeekTasks(previousWeekTasks => {
      return Object.keys(previousWeekTasks).reduce<WeekDaysTasks>(
        (acc, day) => {
          if (chosenWeekDays.includes(day)) {
            // To ensure we have unique ID's we get the last task's ID
            // and add 1, if there's no previous tasks then the ID will be 1.
            let lastTaskId = 0
            if (previousWeekTasks[day].length > 0) {
              lastTaskId = Number(
                previousWeekTasks[day][previousWeekTasks[day].length - 1].id,
              )
            }

            const sortedWeekTasks = [
              ...previousWeekTasks[day],
              { startTime, endTime, id: `${lastTaskId + 1}`, description },
            ].sort((a, b) => {
              const aParsed = parse(a.startTime, 'HH:mm', getEpochDate())
              const bParsed = parse(b.startTime, 'HH:mm', getEpochDate())
              return aParsed.valueOf() - bParsed.valueOf()
            })

            return {
              ...acc,
              [day]: sortedWeekTasks,
            }
          }

          return {
            ...acc,
            [day]: [...previousWeekTasks[day]],
          }
        },
        {},
      )
    })
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const variables: CreateScheduleMutationVariables = {
      title: previousStepData.title,
      days: Object.keys(weekTasks).map(day => {
        const validWeekDay = day.toLowerCase()
        return {
          week_day: validWeekDay as Schedule_Day_Week_Day_Enum,
          tasks: {
            data: weekTasks[day].map(task => {
              const parsedStart = parse(task.startTime, 'HH:mm', getEpochDate())

              const startTime = setDay(
                parsedStart,
                monthsMappings[day],
              ).toISOString()

              if (task.endTime) {
                const parsedEnd = parse(task.endTime, 'HH:mm', getEpochDate())
                const endTime = setDay(
                  parsedEnd,
                  monthsMappings[day],
                ).toISOString()

                return {
                  description: task.description,
                  start_time: startTime,
                  end_time: endTime,
                }
              }

              return {
                description: task.description,
                start_time: startTime,
                end_time: null,
              }
            }),
          },
        }
      }),
    }

    mutate(variables)
  }

  return (
    <>
      <h2 className="max-w-6xl items-center mb-2 mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
        Add tasks to your new schedule or skip this and do it later.
      </h2>
      <p className="text-base sm:mb-2 mb-3 leading-6 font-medium text-gray-700">
        Tasks are events or actions such as walking the dog, taking out the
        trash and anything else you can think of. They make up the days of a
        schedule and are essential for making your schedules effective.
      </p>
      <div className="relative">
        <button
          onClick={() => setIsVisible(true)}
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          New task
        </button>
        <StepTwoNewTask
          leaveEvents={['escape']}
          onSubmit={addTask}
          onClose={() => setIsVisible(false)}
          isOpen={isVisible}
          weekDays={weekDays}
        />
      </div>
      <div className="block mb-6">
        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
          {weekDays.map(weekDay => (
            <div
              key={weekDay}
              className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <div className="sm:col-span-2">
                <div className="mb-3">
                  <span className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {weekDay}
                  </span>
                </div>
                <div className="flow-root">
                  <ul className="sm:-mb-8">
                    {weekTasks[weekDay].length > 0 ? (
                      weekTasks[weekDay].map((task, index, weekTasksRef) => (
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
                                    date={parse(
                                      task.startTime,
                                      'HH:mm',
                                      getEpochDate(),
                                    )}
                                  />
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                  <p className="text-sm text-gray-500">
                                    {task.description}
                                  </p>
                                </div>
                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                  {task.endTime ? (
                                    <>
                                      From{' '}
                                      <time dateTime={task.startTime}>
                                        {format(
                                          parse(
                                            task.startTime,
                                            'HH:mm',
                                            getEpochDate(),
                                          ),
                                          "hh:mm' 'a",
                                        )}
                                      </time>{' '}
                                      to{' '}
                                      <time dateTime={task.endTime}>
                                        {format(
                                          parse(
                                            task.endTime,
                                            'HH:mm',
                                            getEpochDate(),
                                          ),
                                          "hh:mm' 'a",
                                        )}
                                      </time>
                                    </>
                                  ) : (
                                    <time dateTime={task.startTime}>
                                      {format(
                                        parse(
                                          task.startTime,
                                          'HH:mm',
                                          getEpochDate(),
                                        ),
                                        "hh:mm' 'a",
                                      )}
                                    </time>
                                  )}
                                </div>
                              </div>
                            </div>
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
        <form onSubmit={submit}>
          <div className="flex mt-4 sm:mt-12">
            <button
              onClick={() => {
                mutate({
                  title: previousStepData.title,
                  days: Object.keys(weekTasks).map(day => {
                    const validWeekDay = day.toLowerCase()
                    return {
                      week_day: validWeekDay as Schedule_Day_Week_Day_Enum,
                    }
                  }),
                })
              }}
              type="button"
              disabled={status === 'loading'}
              className="inline-flex items-center disabled:cursor-not-allowed disabled:opacity-60 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Skip
            </button>
            <button
              type="submit"
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
              Continue
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

type WeekDaysTasks = Record<string, Task[]>

type Task = {
  id: string
  description: string
  startTime: string
  endTime: string
}

type CreateScheduleFormStepTwoProps = {
  previousStepData: FormData
}

export default CreateScheduleFormStepTwo
export { TimeIcon, capitalizeFirstLetter }
