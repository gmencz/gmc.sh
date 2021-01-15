import { format, getHours, parse } from 'date-fns'
import { useState } from 'react'
import { FormData } from './step-1'
import StepTwoNewTask, { NewTask } from './step-2-new-task'

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

function NewScheduleFormStepTwo({
  previousStepData,
}: NewScheduleFormStepTwoProps) {
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false)
  const weekDays = Object.keys(previousStepData.days)
    .filter(key => previousStepData.days[key])
    .map(capitalizeFirstLetter)

  const [weekTasks, setWeekTasks] = useState(() =>
    weekDays.reduce<WeekDaysTasks>(
      (acc, day) => ({ ...acc, [capitalizeFirstLetter(day)]: [] }),
      {},
    ),
  )

  const addTask = ({ description, chosenWeekDays, startTime }: NewTask) => {
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
              { startTime, id: `${lastTaskId + 1}`, description },
            ].sort((a, b) => {
              const aParsed = parse(a.startTime, 'HH:mm', new Date())
              const bParsed = parse(b.startTime, 'HH:mm', new Date())
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

  return (
    <>
      <h2 className="max-w-6xl items-center mb-2 mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
        Add tasks to your new schedule or skip this and do it later.
      </h2>
      <p className="text-base mb-2 leading-6 font-medium text-gray-700">
        Tasks are events or actions such as walking the dog, taking out the
        trash and anything else you can think of. They make up the days of a
        schedule and are essential for making your schedules effective.
      </p>
      <div className="relative">
        <button
          onClick={() => setIsNewTaskOpen(isOpenOrClosed => !isOpenOrClosed)}
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          New task
        </button>
        <StepTwoNewTask
          onSubmit={addTask}
          onClose={() => setIsNewTaskOpen(false)}
          isOpen={isNewTaskOpen}
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
              <div>
                <span className="block mb-2 text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  {weekDay}
                </span>
              </div>
              <div className="mt-4 sm:mt-0 sm:col-span-2">
                <div className="flow-root">
                  <ul className="-mb-8">
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
                                      new Date(),
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
                                  <time dateTime="2020-09-20">
                                    {format(
                                      parse(
                                        task.startTime,
                                        'HH:mm',
                                        new Date(),
                                      ),
                                      "hh:mm' 'a",
                                    )}
                                  </time>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>
                        <div className="min-w-0 flex-1 pt-2.5 flex justify-between space-x-4">
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
        <form>
          <div className="flex mt-12">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Skip
            </button>
            <button
              type="button"
              className="ml-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
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
}

type NewScheduleFormStepTwoProps = {
  previousStepData: FormData
}

export default NewScheduleFormStepTwo
