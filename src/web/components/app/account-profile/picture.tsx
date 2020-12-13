import { updateProfilePicture } from 'api/update-profile-picture'
import ErrorAlert from 'components/error-alert'
import { ChangeEvent, FormEvent, Fragment, useRef, useState } from 'react'
import { QueryStatus, useMutation } from 'react-query'
import { appQueryCache } from 'pages/_app'
import { ApiError } from 'utils/api-error'
import { meKey } from 'utils/react-query-keys'
import ImageCrop, { Crop } from 'react-image-crop'
import Image from 'next/image'
import { Transition } from '@headlessui/react'
import { useDialog } from 'hooks/use-dialog'
import 'react-image-crop/dist/ReactCrop.css'
import { readFile } from 'utils/read-file'
import { getCroppedImg } from 'utils/get-cropped-img'
import SuccessAlert from 'components/success-alert'

type ProfilePictureProps = {
  profilePictureUrl: string
}

type CroppedImage = {
  src: string | null
  file: File | null
  croppedSrc: string | null
  crop: Crop
}

const initialImageState: CroppedImage = {
  src: null,
  file: null,
  croppedSrc: null,
  crop: {
    unit: '%',
    width: 30,
    aspect: 1,
  },
}

function ProfilePicture({ profilePictureUrl }: ProfilePictureProps) {
  const [image, setImage] = useState(initialImageState)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const resetImage = () => setImage(initialImageState)

  const { ref: cropDialogRef } = useDialog({
    isOpen: !!image.src,
    onClose: resetImage,
    options: {
      disableClickOutside: true,
    },
  })

  const [mutate, { error, status, reset }] = useMutation(updateProfilePicture, {
    onSuccess: data => {
      appQueryCache.setQueryData(meKey, data)
    },
    onSettled: resetImage,
  })

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return
    }

    const selectedImages = event.target.files
    const newProfileImage = selectedImages[0]
    const newProfileImageSrc = await readFile(newProfileImage)

    setImage(data => ({
      ...data,
      src: newProfileImageSrc as string,
      file: newProfileImage,
    }))
  }

  const setNewProfilePicture = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!image.croppedSrc || !image.file) {
      return
    }

    const croppedImageBlob = await fetch(image.croppedSrc).then(res =>
      res.blob(),
    )

    const croppedImageFile = new File([croppedImageBlob], image.file.name)

    const formData = new FormData()
    formData.append('newProfilePicture', croppedImageFile)

    mutate(formData).then(() => {
      URL.revokeObjectURL(image.croppedSrc as string)
    })
  }

  const cropImage = async (crop: Crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(imageRef.current, crop)
      setImage(data => ({ ...data, croppedSrc: croppedImageUrl as string }))
    }
  }

  const hasSelectedNewProfilePicture = !!image.src

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
        <div className="h-12 w-12">
          <Image
            className="rounded-full object-cover"
            src={profilePictureUrl}
            alt="Profile"
            height="100%"
            width="100%"
            priority
          />
        </div>
      </label>
      <input
        id="new-profile-picture"
        type="file"
        accept=".gif,.jpg,.jpeg,.png,.jfif"
        className="hidden"
        value=""
        onChange={e => onFileChange(e)}
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
      <SuccessAlert isOpen={status === QueryStatus.Success} onClose={reset}>
        <p className="text-sm font-medium text-green-800">
          Your profile picture has been successfully updated.
        </p>
      </SuccessAlert>
      {hasSelectedNewProfilePicture && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition
              show={hasSelectedNewProfilePicture}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {ref => (
                <div
                  ref={ref}
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
                </div>
              )}
            </Transition>

            {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition
              show={hasSelectedNewProfilePicture}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {ref => (
                <div
                  ref={ref}
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-md sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div ref={cropDialogRef} className="px-4 pt-5 pb-4 sm:p-6">
                    <form onSubmit={event => setNewProfilePicture(event)}>
                      <div>
                        <div>
                          <div className="flex items-center">
                            <h3
                              className="text-lg leading-6 font-medium text-gray-900"
                              id="modal-headline"
                            >
                              Crop your new profile picture
                            </h3>
                            <div className="flex ml-auto items-center mt-1">
                              <button
                                type="button"
                                onClick={resetImage}
                                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <span className="sr-only">Close</span>
                                <svg
                                  className="h-6 w-6"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div
                            className="mt-5 overflow-y-auto pr-4"
                            style={{ maxHeight: '66vh' }}
                          >
                            <ImageCrop
                              src={image.src as string}
                              crop={image.crop}
                              circularCrop
                              ruleOfThirds
                              className="w-full"
                              imageStyle={{
                                width: '100%',
                              }}
                              onImageLoaded={image =>
                                (imageRef.current = image)
                              }
                              onComplete={cropImage}
                              onChange={crop => {
                                setImage(data => ({ ...data, crop }))
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-6">
                        <button
                          type="submit"
                          disabled={status === QueryStatus.Loading}
                          className="disabled:cursor-not-allowed disabled:opacity-60 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        >
                          Set new profile picture
                          {status === QueryStatus.Loading && (
                            <Fragment>
                              <span className="sr-only">loading...</span>
                              <svg
                                className="animate-spin ml-3 h-5 w-5 text-white"
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
                            </Fragment>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </Transition>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default ProfilePicture
