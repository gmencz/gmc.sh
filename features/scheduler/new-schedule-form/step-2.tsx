import { FormData } from './step-1'

type WeekDaysTasks = Record<string, Task[]>

type Task = {
  description: string
  startTime: string
}

type NewScheduleFormStepTwoProps = {
  previousStepData: FormData
}

function NewScheduleFormStepTwo({
  previousStepData,
}: NewScheduleFormStepTwoProps) {
  const weekDays = Object.keys(previousStepData.days).filter(
    key => previousStepData.days[key],
  )

  const initialTasks = weekDays.reduce<WeekDaysTasks>(
    (acc, weekDay) => ({ ...acc, [weekDay]: [] }),
    {},
  )

  console.log({ initialTasks })

  return (
    <div>
      <h2 className="max-w-6xl mb-2 mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
        Add tasks to the schedule or skip this and do it later.
      </h2>
      <p className="text-base mb-4 leading-6 font-medium text-gray-700">
        Tasks are events or actions such as walking the dog, taking out the
        trash and anything else you can think of. They make up the days of a
        schedule and are essential for making your schedules effective.
      </p>
      <div className="block mb-6">
        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
          {weekDays.map(weekDay => (
            <div
              key={weekDay}
              className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <span className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 capitalize">
                {weekDay}
              </span>
              <div className="mt-2 sm:mt-0 sm:col-span-2">
                <div className="flow-root">
                  <ul className="-mb-8">
                    <li>
                      <div className="relative pb-8">
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        ></span>
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center">
                              <svg
                                className="h-5 w-5 text-white"
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
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                Walk the dog
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime="2020-09-20">10:20 AM</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-8">
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center">
                              <svg
                                className="h-5 w-5 text-white"
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
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                Take the trash out
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime="2020-10-04">9:30 PM</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form>
          <div className="flex mt-10">
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
    </div>
  )
}

export default NewScheduleFormStepTwo
