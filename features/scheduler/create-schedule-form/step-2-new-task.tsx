import { Listbox, Transition } from '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export type NewTask = NewTaskFormData

type NewTaskFormData = {
  chosenWeekDays: string[]
  description: string
  startTime: string
}

type StepTwoNewTaskProps = {
  isOpen: boolean
  weekDays: string[]
  onClose: VoidFunction
  onSubmit: (data: NewTask) => void
  position?: 'left' | 'right'
  loading?: boolean
}

const schema = yup.object().shape({
  description: yup
    .string()
    .required('The description is required.')
    .max(4096, `The description can't be longer than 4096 characters.`),
  startTime: yup
    .string()
    .required('The time at which the task is expected to happen is required.'),
})

const daysErrorMessage = 'You must choose at least one day for the task.'
const weekDaysSchema = yup.object().shape({
  chosenWeekDays: yup
    .array()
    .required(daysErrorMessage)
    .min(1, daysErrorMessage)
    .max(7, "You can't choose more than seven days for the task"),
})

const StepTwoNewTask = forwardRef<HTMLDivElement, StepTwoNewTaskProps>(
  function StepTwoNewTask(
    { isOpen, weekDays, onClose, loading, onSubmit, position = 'left' },
    ref,
  ) {
    const [chosenWeekDays, setChosenWeekDays] = useState<string[]>([])
    const [weekDaysError, setWeekDaysError] = useState<string | null>(null)
    const lastLoadingRef = useRef(loading)

    const { register, errors, handleSubmit, reset } = useForm<NewTaskFormData>({
      defaultValues: { description: '', startTime: '' },
      resolver: yupResolver(schema),
    })

    const resetAndClose = () => {
      if (typeof loading !== 'boolean') {
        reset()
        setWeekDaysError(null)
        setChosenWeekDays([])
      }

      onClose()
    }

    // We only want to clear out the form values when we stop loading.
    useEffect(() => {
      if (
        typeof loading === 'boolean' &&
        !loading &&
        !isOpen &&
        lastLoadingRef.current
      ) {
        reset()
        setWeekDaysError(null)
        setChosenWeekDays([])
      }

      lastLoadingRef.current = loading
    }, [isOpen, loading, reset])

    const handleClose = () => resetAndClose()

    const submit = async ({ description, startTime }: NewTaskFormData) => {
      try {
        await weekDaysSchema.validate({ chosenWeekDays })
        onSubmit({ description, startTime, chosenWeekDays })
        resetAndClose()
      } catch (error) {
        setWeekDaysError(error.message)
      }
    }

    return (
      <div className="relative z-10" ref={ref}>
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div
            className={
              position === 'left'
                ? `origin-top-left max-w-sm w-full absolute left-0 mt-2 rounded-md shadow-lg p-4 bg-gray-50 ring-1 ring-black ring-opacity-5 outline-none`
                : `origin-top-right max-w-sm w-full absolute right-0 mt-2 rounded-md shadow-lg p-4 bg-gray-50 ring-1 ring-black ring-opacity-5 outline-none`
            }
          >
            <form onSubmit={handleSubmit(submit)}>
              <div className="w-full mb-4">
                <Listbox
                  as="div"
                  className="space-y-1"
                  value=""
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error because the function isn't properly typed when specifying the "as" prop.
                  onChange={async value => {
                    const exists = chosenWeekDays.includes(value)
                    if (!exists) {
                      setWeekDaysError(null)
                      return setChosenWeekDays(previousChosenWeekDays => [
                        ...previousChosenWeekDays,
                        value,
                      ])
                    }

                    setChosenWeekDays(previousChosenWeekDays =>
                      previousChosenWeekDays.filter(day => day !== value),
                    )

                    if (chosenWeekDays.length <= 1) {
                      setWeekDaysError(daysErrorMessage)
                    }
                  }}
                >
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block text-base leading-5 font-medium text-gray-700">
                        Days
                      </Listbox.Label>
                      <div className="relative">
                        <span className="inline-block w-full rounded-md shadow-sm">
                          <Listbox.Button
                            className={
                              !!weekDaysError
                                ? 'cursor-default relative w-full rounded-md border border-red-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-red-500 focus:ring-1 focus:border-red-500 sm:text-sm sm:leading-5'
                                : 'cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 sm:text-sm sm:leading-5'
                            }
                          >
                            <span className="block truncate">
                              {chosenWeekDays.join(', ') ||
                                'Choose the days for the task'}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <svg
                                className="h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                              >
                                <path
                                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </Listbox.Button>
                        </span>

                        <Transition
                          show={open}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                        >
                          <Listbox.Options
                            static
                            className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                          >
                            {weekDays.map(day => (
                              <Listbox.Option key={day} value={day}>
                                {({ active }) => (
                                  <div
                                    className={`${
                                      active
                                        ? 'text-white bg-indigo-600'
                                        : 'text-gray-900'
                                    } cursor-default select-none relative py-2 pl-8 pr-4`}
                                  >
                                    <span
                                      className={`${
                                        chosenWeekDays.includes(day)
                                          ? 'font-semibold'
                                          : 'font-normal'
                                      } block truncate`}
                                    >
                                      {day}
                                    </span>
                                    {chosenWeekDays.includes(day) && (
                                      <span
                                        className={`${
                                          active
                                            ? 'text-white'
                                            : 'text-indigo-600'
                                        } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                      >
                                        <svg
                                          className="h-5 w-5"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {weekDaysError}
                </p>
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="description"
                  className="block text-base font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1 max-w-lg">
                  <textarea
                    rows={5}
                    name="description"
                    id="description"
                    ref={register}
                    className={
                      !!errors.description
                        ? 'shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-red-300 rounded-md'
                        : 'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    }
                    placeholder="Walk the dog..."
                  />
                </div>
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.description?.message}
                </p>
              </div>
              <div className="block mb-6">
                <label
                  htmlFor="startTime"
                  className="block text-base font-medium text-gray-700"
                >
                  Time
                </label>
                <div className="mt-1 max-w-lg">
                  <input
                    type="time"
                    name="startTime"
                    id="startTime"
                    ref={register}
                    className={
                      !!errors.startTime
                        ? 'shadow-sm focus:ring-red-500 w-full focus:border-red-500 block sm:text-sm border-red-300 rounded-md'
                        : 'shadow-sm focus:ring-indigo-500 w-full focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md'
                    }
                  />
                </div>
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.startTime?.message}
                </p>
              </div>
              <div className="flex">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="inline-flex items-center disabled:cursor-not-allowed disabled:opacity-60 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-2 inline-flex items-center disabled:cursor-not-allowed disabled:opacity-60 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading && (
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
                  Add task
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    )
  },
)

export default StepTwoNewTask
