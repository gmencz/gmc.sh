function NewScheduleForm() {
  return (
    <form>
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
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Weekend schedule"
          />
        </div>
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
              />
              <span className="ml-2">Monday</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox rounded text-indigo-700 focus:ring-indigo-700"
              />
              <span className="ml-2">Tuesday</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox rounded text-indigo-700 focus:ring-indigo-700"
              />
              <span className="ml-2">Wednesday</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox rounded text-indigo-700 focus:ring-indigo-700"
              />
              <span className="ml-2">Thursday</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox rounded text-indigo-700 focus:ring-indigo-700"
              />
              <span className="ml-2">Friday</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox rounded text-indigo-700 focus:ring-indigo-700"
              />
              <span className="ml-2">Saturday</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox rounded text-indigo-700 focus:ring-indigo-700"
              />
              <span className="ml-2">Sunday</span>
            </label>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
        >
          Continue
        </button>
      </div>
    </form>
  )
}

export default NewScheduleForm
