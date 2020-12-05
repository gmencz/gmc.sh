import { V1ApiTypes } from '@gmcsh/shared'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import Header from '../../components/header'
import { betterFetch } from '../../utils/better-fetch'
import { API_ENDPOINT } from '../../utils/constants'

type GetServerSidePropsResult = {
  data: V1ApiTypes.JoinMailingListResponse | null
  error: V1ApiTypes.ErrorResponse | null
}

export const getServerSideProps: GetServerSideProps<GetServerSidePropsResult> = async ctx => {
  const { token } = ctx.query

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const { data, error } = await betterFetch<V1ApiTypes.JoinMailingListResponse>(
    `${API_ENDPOINT}/v1/mailing/join-list`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    },
  )

  return {
    props: {
      data,
      error,
    },
  }
}

type VerifyReleaseSubscriptionProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>

function VerifyReleaseSubscription({
  data,
  error,
}: VerifyReleaseSubscriptionProps) {
  console.log(data, error)

  return (
    <>
      <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
        <Header isAuthenticated={false} />
        <div className="relative py-16 bg-white overflow-hidden min-h-full">
          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
            <div
              className="relative h-full text-lg max-w-prose mx-auto"
              aria-hidden="true"
            >
              <svg
                className="absolute top-12 left-full transform translate-x-32"
                width="404"
                height="384"
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width="404"
                  height="384"
                  fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
                />
              </svg>
              <svg
                className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
                width="404"
                height="384"
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width="404"
                  height="384"
                  fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
                />
              </svg>
              <svg
                className="absolute bottom-12 left-full transform translate-x-32"
                width="404"
                height="384"
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="d3eb07ae-5182-43e6-857d-35c643af9034"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width="404"
                  height="384"
                  fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
                />
              </svg>
            </div>
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto">
              <h1>
                <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                  App release subscription
                </span>
                <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Thank you for subscribing
                </span>
              </h1>
              <p className="mt-8 text-xl text-gray-500 leading-8">
                You have subscribed to our app release mailing list with the
                email {data?.subscriberEmail} and we will notify you when the
                app is out!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyReleaseSubscription
