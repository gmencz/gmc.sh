import { format, parseISO } from 'date-fns'
import { useMySchedulesQuery } from 'generated/graphql'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const PER_PAGE = 10
function SchedulerList() {
  const { query: paginationInfo } = useRouter()
  const page = Number(paginationInfo['page']) || 1
  const perPage = Number(paginationInfo['per-page']) || PER_PAGE
  const offset = page === 1 ? 0 : (page - 1) * perPage

  const { data, status } = useMySchedulesQuery(
    {
      limit: perPage,
      offset,
    },
    { staleTime: Infinity },
  )

  const totalSchedules =
    data?.me.account?.schedules_aggregate.aggregate?.count || 0

  return (
    <>
      <div className="hidden sm:block">
        <div className="max-w-6xl mx-auto">
          {status === 'loading' && (
            <div className="hidden sm:flex animate-pulse mt-2 sm:flex-col">
              <span className="sr-only">loading schedules...</span>
              <div className="block rounded-t-md bg-gray-200 h-8"></div>
              <div className="block bg-gray-200 mt-0.5 h-64"></div>
              <div className="block rounded-b-md bg-gray-200 mt-0.5 h-8"></div>
            </div>
          )}
          {status === 'success' && (
            <div className="flex flex-col mt-2">
              {(data?.me.account?.schedules.length || 0) > 0 && (
                <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          On Days
                        </th>
                        <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                          Status
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Rows of schedules */}
                      {data?.me.account?.schedules.map(schedule => (
                        <tr className="bg-white" key={schedule.id}>
                          <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex">
                              <Link href={`/scheduler/${schedule.id}`}>
                                <a className="group inline-flex space-x-2 truncate text-sm">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <p className="text-gray-500 truncate group-hover:text-gray-900">
                                    {schedule.title}
                                  </p>
                                </a>
                              </Link>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            <div
                              className={
                                schedule.days.length < 2
                                  ? 'w-16 min-w-full'
                                  : undefined
                              }
                            >
                              {schedule.days.map((day, index, days) => (
                                <Link
                                  key={day.week_day}
                                  href={`/scheduler/${schedule.id}/${day}`}
                                >
                                  {days.length > 2 ? (
                                    <a className="capitalize hover:text-gray-900">
                                      {day.week_day.substr(0, 3)}
                                      {index !== days.length - 1 ? ', ' : ''}
                                    </a>
                                  ) : (
                                    <a className="capitalize hover:text-gray-900">
                                      {day.week_day}
                                      {index !== days.length - 1 ? ', ' : ''}
                                    </a>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </td>
                          <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                            {schedule.active ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                                active
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                                inactive
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            {format(
                              parseISO(schedule.created_at),
                              "MMMM' 'd', 'y",
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Pagination */}
                  <nav
                    className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                    aria-label="Pagination"
                  >
                    <div className="hidden sm:block">
                      {totalSchedules < perPage ? (
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">{totalSchedules} </span>
                          {totalSchedules === 1 ? 'schedule' : 'schedules'}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-700">
                          Showing{' '}
                          <span className="font-medium">{offset + 1} </span>
                          to{' '}
                          <span className="font-medium">
                            {offset + (data?.me.account?.schedules.length || 0)}{' '}
                          </span>
                          of{' '}
                          <span className="font-medium">{totalSchedules}</span>
                        </p>
                      )}
                    </div>
                    {totalSchedules > perPage && (
                      <div className="flex-1 flex justify-between sm:justify-end">
                        {page === 1 ? (
                          <button
                            disabled
                            className="relative disabled:cursor-not-allowed inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-white"
                          >
                            Previous
                          </button>
                        ) : (
                          <Link
                            href={{
                              pathname: '/scheduler',
                              query: {
                                page: page - 1,
                                'per-page': PER_PAGE,
                              },
                            }}
                          >
                            <a className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                              Previous
                            </a>
                          </Link>
                        )}
                        {page * perPage >= totalSchedules ? (
                          <button
                            disabled
                            className="ml-3 relative disabled:cursor-not-allowed inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-white"
                          >
                            Next
                          </button>
                        ) : (
                          <Link
                            href={{
                              pathname: '/scheduler',
                              query: {
                                page: page + 1,
                                'per-page': PER_PAGE,
                              },
                            }}
                          >
                            <a className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                              Next
                            </a>
                          </Link>
                        )}
                      </div>
                    )}
                  </nav>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {status === 'success' && (data?.me.account?.schedules.length || 0) === 0 && (
        <div className="mt-4 ring-1 ring-black ring-opacity-5 p-12 rounded-md flex flex-col items-center justify-items-center text-center">
          <div className="max-w-screen-sm">
            <Image src="/no_data.svg" height={200} width={200} />
            <p className="text-lg mt-8 leading-6 font-medium text-gray-900">
              Looks like you don&apos;t have any schedules
            </p>
            <p className="text-base mt-4 leading-6 font-medium text-gray-700">
              Schedules are a time-management tool, they consist of a list of
              times at which possible tasks, events, or actions are intended to
              take place.
            </p>
            <Link href="/scheduler/new-schedule">
              <a className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Create a schedule
              </a>
            </Link>
          </div>
        </div>
      )}

      {/* Mobile list */}
      <div className="shadow sm:hidden -ml-4 -mr-4">
        {status === 'loading' && (
          <div className="flex sm:hidden animate-pulse mt-2 flex-col">
            <span className="sr-only">loading schedules...</span>
            <div className="block bg-gray-200 h-16"></div>
            <div className="block bg-gray-200 mt-0.5 h-16"></div>
            <div className="block bg-gray-200 mt-0.5 h-16"></div>
            <div className="block bg-gray-200 mt-0.5 h-16"></div>
          </div>
        )}
        {status === 'success' && (
          <>
            <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
              {data?.me.account?.schedules.map(schedule => (
                <li key={schedule.id}>
                  <Link href={`/scheduler/${schedule.id}`}>
                    <a className="block px-4 py-4 bg-white hover:bg-gray-50">
                      <span className="flex items-center space-x-4">
                        <span className="flex-1 flex space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="flex flex-col text-gray-500 text-sm">
                            <span className="truncate text-gray-900 font-medium">
                              {schedule.title}
                            </span>
                            <span className="capitalize mb-2">
                              {schedule.days
                                .map(day => day.week_day)
                                .join(', ')}
                            </span>
                            <span>
                              {format(
                                parseISO(schedule.created_at),
                                "MMMM' 'd', 'y",
                              )}
                            </span>
                          </span>
                        </span>
                        {/* Heroicon name: chevron-right */}
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>

            <nav
              className="bg-white rounded-br-lg flex-col rounded-bl-lg px-4 py-3 flex justify-between border-t border-gray-200"
              aria-label="Pagination"
            >
              <div>
                {totalSchedules < perPage ? (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{totalSchedules} </span>
                    {totalSchedules === 1 ? 'schedule' : 'schedules'}
                  </p>
                ) : (
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{offset} </span>
                    to{' '}
                    <span className="font-medium">
                      {offset + (data?.me.account?.schedules.length || 0) - 1}{' '}
                    </span>
                    of <span className="font-medium">{totalSchedules}</span>
                  </p>
                )}
              </div>
              {totalSchedules > perPage && (
                <div className="mt-2 flex-1 flex justify-between">
                  {page === 1 ? (
                    <button
                      disabled
                      className="relative disabled:cursor-not-allowed inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-white"
                    >
                      Previous
                    </button>
                  ) : (
                    <Link
                      href={{
                        pathname: '/scheduler',
                        query: {
                          page: page - 1,
                          'per-page': PER_PAGE,
                        },
                      }}
                    >
                      <a className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Previous
                      </a>
                    </Link>
                  )}
                  {page * perPage >= totalSchedules ? (
                    <button
                      disabled
                      className="ml-3 relative disabled:cursor-not-allowed inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-white"
                    >
                      Next
                    </button>
                  ) : (
                    <Link
                      href={{
                        pathname: '/scheduler',
                        query: {
                          page: page + 1,
                          'per-page': PER_PAGE,
                        },
                      }}
                    >
                      <a className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Next
                      </a>
                    </Link>
                  )}
                </div>
              )}
            </nav>
          </>
        )}
      </div>
    </>
  )
}

export default SchedulerList
