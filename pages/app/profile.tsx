import { yupResolver } from '@hookform/resolvers/yup'
import AccountProfile from 'components/app/account-profile'
import ProfilePicture from 'components/app/account-profile/picture'
import Navbar from 'components/app/navbar'
import Head from 'next/head'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery, useQueryClient } from 'react-query'
import * as yup from 'yup'
import { meKey } from 'utils/react-query-keys'
import { seoDefaults } from 'utils/seo-defaults'
import { withAuthServerSideProps } from 'utils/with-auth-server-side-props'
import { SafeUser } from '@types'
import ErrorAlert from 'components/error-alert'

export const getServerSideProps = withAuthServerSideProps(undefined, {
  authenticatedPage: true,
})

type UpdateProfileInputs = {
  username: string
  bio: string
  name: string
  website: string
  location: string
  publicEmail: string
  twitter: string
}

const schema = yup.object().shape({
  username: yup.string().max(255).required('Your username is required.'),
  bio: yup.string().max(2000),
  name: yup.string().max(255),
  website: yup.string().max(255).url(),
  location: yup.string().max(255),
  publicEmail: yup.string().max(255).email(),
  twitter: yup.string().max(255),
})

function Profile() {
  const queryClient = useQueryClient()
  const { data: me } = useQuery(meKey, () =>
    queryClient.getQueryData<SafeUser>(meKey),
  )

  const {
    register,
    handleSubmit,
    errors,
    clearErrors,
  } = useForm<UpdateProfileInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: me?.username,
      bio: me?.bio as string | undefined,
      location: me?.location as string | undefined,
      name: me?.name as string | undefined,
      publicEmail: me?.publicEmail as string | undefined,
      twitter: me?.twitterUsername as string | undefined,
      website: me?.website as string | undefined,
    },
  })

  const onSubmit = (updatedProfile: UpdateProfileInputs) => {
    console.log(updatedProfile)
  }

  const arraifyedErrorFields = Object.keys(errors)

  return (
    <Fragment>
      <Head>
        <title>Gmc.sh • Profile</title>
        <meta name="description" content={seoDefaults.description} />
        <meta name="image" content={seoDefaults.image} />
        <meta name="keywords" content={seoDefaults.keywords} />

        <meta property="og:url" content={`https://app.gmc.sh/app/profile`} />
        <meta property="og:title" content={seoDefaults.title} />
        <meta property="og:description" content={seoDefaults.description} />
        <meta property="og:image" content={seoDefaults.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="gmencz" />
        <meta name="twitter:title" content={seoDefaults.title} />
        <meta name="twitter:description" content={seoDefaults.description} />
        <meta name="twitter:image" content={seoDefaults.image} />
      </Head>
      <div
        className="fixed top-0 left-0 w-1/2 h-full bg-white"
        aria-hidden="true"
      ></div>
      <div
        className="fixed top-0 right-0 w-1/2 h-full bg-gray-50"
        aria-hidden="true"
      ></div>
      <div className="relative min-h-screen flex flex-col">
        {/* <!-- Navbar --> */}
        <Navbar />

        {/* <!-- 3 column wrapper --> */}
        <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
          {/* <!-- Left sidebar & main wrapper --> */}
          <div className="flex-1 min-w-0 bg-white xl:flex">
            {/* <!-- Account profile --> */}
            <AccountProfile />

            {/* Profile */}
            <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex py-6">
              <form
                className="space-y-8 divide-y divide-gray-200 flex-grow"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                  <div>
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Profile
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>

                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Username
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <div className="max-w-lg flex rounded-md shadow-sm">
                            <input
                              ref={register}
                              className={
                                !!errors.username
                                  ? 'flex-1 block w-full focus:ring-indigo-500 focus:border-red-500 min-w-0 rounded-md sm:text-sm border-red-300'
                                  : 'flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300'
                              }
                              type="text"
                              name="username"
                              id="username"
                              autoComplete="username"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      About
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <textarea
                        id="bio"
                        className={
                          !!errors.bio
                            ? 'max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-red-500 sm:text-sm border-red-300 rounded-md'
                            : 'max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                        }
                        ref={register}
                        name="bio"
                        rows={3}
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Write a few sentences about yourself.
                      </p>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Photo
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="flex items-center">
                        <ProfilePicture />
                        <p className="ml-3 text-sm text-gray-500">
                          You can change it by selecting the photo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Name
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        className={
                          !!errors.name
                            ? 'max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-red-500 sm:text-sm border-red-300 rounded-md'
                            : 'max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                        }
                        ref={register}
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Location
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        className={
                          !!errors.location
                            ? 'max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-red-500 sm:text-sm border-red-300 rounded-md'
                            : 'max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                        }
                        ref={register}
                        type="text"
                        name="location"
                        id="location"
                        autoComplete="location"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="publicEmail"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Contact email
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        className={
                          !!errors.publicEmail
                            ? 'max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-red-500 sm:text-sm border-red-300 rounded-md'
                            : 'max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md'
                        }
                        ref={register}
                        type="text"
                        name="publicEmail"
                        id="publicEmail"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Website
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                          https://
                        </span>
                        <input
                          className={
                            !!errors.website
                              ? 'flex-1 block w-full focus:ring-indigo-500 focus:border-red-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-red-300'
                              : 'flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300'
                          }
                          ref={register}
                          type="text"
                          name="website"
                          id="website"
                          autoComplete="website"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="twitter"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      <span className="sr-only">Twitter username</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                          twitter.com/
                        </span>
                        <input
                          className={
                            !!errors.twitter
                              ? 'flex-1 block w-full focus:ring-indigo-500 focus:border-red-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-red-300'
                              : 'flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300'
                          }
                          ref={register}
                          type="text"
                          name="twitter"
                          id="twitter"
                          autoComplete="twitter"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ErrorAlert
        isOpen={arraifyedErrorFields.length > 0}
        onClose={() => clearErrors()}
      >
        <Fragment>
          <h3 className="text-sm font-medium text-red-800">
            {arraifyedErrorFields.length > 1
              ? `There were ${arraifyedErrorFields.length} errors with your submission`
              : `There was ${arraifyedErrorFields.length} error with your submission`}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc pl-5 space-y-1">
              {arraifyedErrorFields.map(errorField => (
                <li key={errorField}>{errors[errorField].message}</li>
              ))}
            </ul>
          </div>
        </Fragment>
      </ErrorAlert>
    </Fragment>
  )
}

export default Profile
