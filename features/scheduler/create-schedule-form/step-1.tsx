import { FieldError, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import StepTwo from './step-2'
import { useState } from 'react'

export type FormData = {
  title: string
  days: {
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
  }
}

const schema = yup.object().shape({
  title: yup
    .string()
    .required('The title is required.')
    .max(255, `The title can't be longer than 255 characters.`),
  days: yup
    .object()
    .test(
      'at least one day was checked',
      'You must choose at least one day.',
      days => Object.values(days).some(Boolean),
    ),
})

function CreateScheduleFormStepOne() {
  const [stepData, setStepData] = useState<FormData>()
  const {
    register,
    handleSubmit,
    errors,
    trigger,
    formState: { isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const revalidateDays = () => trigger('days')
  const submit = (data: FormData) => setStepData(data)

  return isSubmitSuccessful ? (
    <StepTwo previousStepData={stepData as FormData} />
  ) : (
    <form onSubmit={handleSubmit(submit)}>
      <h2 className="max-w-6xl mb-4 mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
        First, we need you to tell us a little about the new schedule.
      </h2>
      <div className="block mb-6">
        <label
          htmlFor="title"
          className="block text-base font-medium text-gray-700"
        >
          Title
        </label>
        <div className="mt-1 max-w-lg">
          <input
            type="text"
            name="title"
            id="title"
            ref={register}
            className={
              !!errors.title
                ? 'shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-red-300 rounded-md'
                : 'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
            }
            placeholder="Weekend schedule"
          />
        </div>
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errors.title?.message}
        </p>
      </div>
      <div className="block">
        <span className="text-base font-medium text-gray-700">
          On which days do you want to carry this schedule out?
        </span>
        <div className="mt-2">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox rounded text-indigo-700 focus:ring-indigo-700"
                name="days.monday"
                ref={register}
                onChange={revalidateDays}
              />
              <span className="ml-2">Monday</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                ref={register}
                name="days.tuesday"
                onChange={revalidateDays}
                className="form-checkbox rounded text-indigo-700 focus:ring-indigo-700"
              />
              <span className="ml-2">Tuesday</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                ref={register}
                onChange={revalidateDays}
                name="days.wednesday"
                className="form-checkbox rounded text-indigo-700 focus:ring-indigo-700"
              />
              <span className="ml-2">Wednesday</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                ref={register}
                onChange={revalidateDays}
                name="days.thursday"
                className="form-checkbox rounded text-indigo-700 focus:ring-indigo-700"
              />
              <span className="ml-2">Thursday</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                ref={register}
                onChange={revalidateDays}
                name="days.friday"
                className="form-checkbox rounded text-indigo-700 focus:ring-indigo-700"
              />
              <span className="ml-2">Friday</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                ref={register}
                onChange={revalidateDays}
                name="days.saturday"
                className="form-checkbox rounded text-indigo-700 focus:ring-indigo-700"
              />
              <span className="ml-2">Saturday</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                ref={register}
                onChange={revalidateDays}
                name="days.sunday"
                className="form-checkbox rounded text-indigo-700 focus:ring-indigo-700"
              />
              <span className="ml-2">Sunday</span>
            </label>
          </div>
        </div>
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {(errors.days as FieldError)?.message}
        </p>
      </div>
      <div className="mt-6">
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
        >
          Continue
        </button>
      </div>
    </form>
  )
}

export default CreateScheduleFormStepOne
