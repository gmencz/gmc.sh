import { format } from 'date-fns'
import { useQuery, useQueryClient } from 'react-query'
import { currentUserLinksKey, meKey } from 'utils/react-query-keys'
import { Detail, DetailDescription, DetailTerm } from './detail'
import ProfilePicture from './picture'

function userHasPublicDetails(user: any) {
  return (
    !!user.location ||
    !!user.publicEmail ||
    !!user.twitterUsername ||
    !!user.website
  )
}

function AccountProfile() {
  const queryClient = useQueryClient()
  const { data: me } = useQuery<any>(meKey, () =>
    queryClient.getQueryData(meKey),
  )
  const { data: links } = useQuery<any>(currentUserLinksKey, () =>
    queryClient.getQueryData(currentUserLinksKey),
  )
  const hasPublicDetails = userHasPublicDetails(me)

  return (
    <div className="xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white">
      <div className="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-8">
            <div className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
              {/* <!-- Profile --> */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-12 w-12">
                  <ProfilePicture
                    profilePictureUrl={me?.profilePicture as string}
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-base font-medium text-gray-900">
                    {me?.username}
                  </div>
                  <span className="text-sm text-gray-500 group-hover:text-gray-900 font-medium">
                    Joined{' '}
                    {format(
                      new Date((me?.createdAt as unknown) as string),
                      'MMMM y',
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="space-y-1">
                  {me?.name && (
                    <span className="text-base font-medium text-gray-900">
                      {me.name}
                    </span>
                  )}
                  {me?.bio && <p className="text-sm text-gray-900">{me.bio}</p>}
                </div>
                {hasPublicDetails && (
                  <dl className="space-y-2">
                    {me?.location && (
                      <Detail>
                        <DetailTerm>
                          <span className="sr-only">Location</span>
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 6.243 6.377 6.903 8 16.398 1.623-9.495 8-10.155 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.342-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                          </svg>
                        </DetailTerm>
                        <DetailDescription>{me?.location}</DetailDescription>
                      </Detail>
                    )}
                    {me?.publicEmail && (
                      <Detail>
                        <DetailTerm>
                          <span className="sr-only">Contact email</span>
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z" />
                          </svg>
                        </DetailTerm>
                        <DetailDescription>
                          <a href={`mailto:${me?.publicEmail}`}>
                            {me?.publicEmail}
                          </a>
                        </DetailDescription>
                      </Detail>
                    )}
                    {me?.website && (
                      <Detail>
                        <DetailTerm>
                          <span className="sr-only">Website</span>
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z" />
                          </svg>
                        </DetailTerm>
                        <DetailDescription>
                          <a href={me?.website}>{me?.website}</a>
                        </DetailDescription>
                      </Detail>
                    )}
                    {me?.twitterUsername && (
                      <Detail>
                        <DetailTerm>
                          <span className="sr-only">Twitter username</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        </DetailTerm>
                        <DetailDescription>
                          <a
                            href={`https://twitter.com/${me?.twitterUsername}`}
                          >
                            {me?.twitterUsername}
                          </a>
                        </DetailDescription>
                      </Detail>
                    )}
                  </dl>
                )}
              </div>
              {/* <!-- Action buttons --> */}
              <div className="flex flex-col sm:flex-row xl:flex-col">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:w-full"
                >
                  Edit Profile
                </button>
              </div>
              <dl>
                <Detail>
                  <DetailTerm>
                    <span className="sr-only">Total links</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7.092 5.099l1.439-.205-.439-3.083-1.44.204.44 3.084zm-2.211 3.445l.205-1.44-3.084-.44-.205 1.441 3.084.439zm-.494-5.163l-1.03 1.03 2.203 2.204 1.029-1.03-2.202-2.204zm12.541 15.565l-1.439.205.438 3.083 1.441-.204-.44-3.084zm2.21-3.446l-.206 1.441 3.085.439.205-1.44-3.084-.44zm.495 5.163l1.028-1.029-2.204-2.204-1.027 1.03 2.203 2.203zm2.64-18.904c2.344 2.346 2.344 6.149.001 8.494l-3.896 3.896-1.417-1.417 3.895-3.895c1.562-1.562 1.562-4.101 0-5.662-1.562-1.562-4.101-1.562-5.662 0l-3.894 3.895-1.416-1.416 3.895-3.895c2.344-2.345 6.147-2.345 8.494 0zm-8.138 16.631l-3.852 3.851c-2.344 2.347-6.146 2.345-8.494.001-2.344-2.346-2.345-6.149 0-8.494l3.854-3.851 1.414 1.415-3.851 3.851c-1.562 1.562-1.562 4.102-.001 5.663 1.563 1.561 4.102 1.561 5.664-.001l3.85-3.851 1.416 1.416z" />
                    </svg>
                  </DetailTerm>
                  <DetailDescription>{links?.total} Links</DetailDescription>
                </Detail>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountProfile
