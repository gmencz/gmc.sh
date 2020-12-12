import { updateProfilePicture } from 'api/update-profile-picture'
import ErrorAlert from 'components/error-alert'
import { ChangeEvent, Fragment } from 'react'
import { QueryStatus, useMutation } from 'react-query'
import { appQueryCache } from 'pages/_app'
import { ApiError } from 'utils/api-error'
import { meKey } from 'utils/react-query-keys'

type ProfilePictureProps = {
  profilePictureUrl: string
}

function ProfilePicture({ profilePictureUrl }: ProfilePictureProps) {
  const [mutate, { error, status, reset }] = useMutation(updateProfilePicture, {
    onSuccess: data => {
      appQueryCache.setQueryData(meKey, data)
    },
  })

  const onSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('triggered')

    if (!event.target.files || event.target.files.length === 0) {
      return
    }

    const selectedImages = event.target.files
    const newProfileImage = selectedImages[0]

    const formData = new FormData()
    formData.append('newProfilePicture', newProfileImage)

    mutate(formData)
  }

  return (
    <Fragment>
      <label
        htmlFor="new-profile-picture"
        className={
          status === QueryStatus.Loading
            ? 'cursor-not-allowed'
            : 'cursor-pointer'
        }
      >
        {status === QueryStatus.Loading ? (
          <div className="h-12 w-12 rounded-full flex items-center justify-center border border-gray-100">
            <span className="sr-only">loading...</span>
            <svg
              className="animate-spin h-6 w-6 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              role="alert"
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
          </div>
        ) : (
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={profilePictureUrl}
            alt="Profile"
          />
        )}
      </label>
      <input
        id="new-profile-picture"
        type="file"
        accept=".gif,.jpg,.jpeg,.png,.jfif"
        className="hidden"
        onChange={onSelectImage}
      />
      {error instanceof ApiError && (
        <ErrorAlert isOpen={!!error} onClose={reset}>
          <Fragment>
            <h3 className="text-sm font-medium text-red-800">
              There was an error updating your profile picture
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error.error.message}</p>
            </div>
          </Fragment>
        </ErrorAlert>
      )}
    </Fragment>
  )
}

export default ProfilePicture
