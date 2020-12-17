import userEvent from '@testing-library/user-event'
import { SafeUser } from '@types'
import { render, screen, waitFor } from 'test/next-testing-utils'
import { betterFetch } from 'utils/better-fetch'
import { APP_ENDPOINT } from 'utils/constants'
import ProfilePicture from '../picture'

function uploadNewProfilePicture(testImageName: string) {
  const file = new File(['(⌐□_□)'], testImageName, { type: 'image/png' })
  const profilePictureInput = screen.getByLabelText(
    /avatar/i,
  ) as HTMLInputElement
  userEvent.upload(profilePictureInput, file)

  return { profilePictureInput, file }
}

describe('ProfilePicture', () => {
  const testImageName = 'test.png'

  test('uploading an image opens a modal to crop it', async () => {
    const data = await betterFetch<SafeUser>(APP_ENDPOINT + `/api/me`)

    render(
      <ProfilePicture profilePictureUrl={data.data?.profilePicture || ''} />,
    )

    const { profilePictureInput, file } = uploadNewProfilePicture(testImageName)

    expect((profilePictureInput.files as FileList)[0]).toStrictEqual(file)
    expect(profilePictureInput.files).toHaveLength(1)

    await waitFor(() =>
      expect(
        screen.queryByText(/crop your new profile picture/i),
      ).toBeInTheDocument(),
    )
  })
})
