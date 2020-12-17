import { V1ApiTypes } from '@gmcsh/shared'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from 'test/next-testing-utils'
import { betterFetch } from 'utils/better-fetch'
import { API_ENDPOINT } from 'utils/constants'
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
    const data = await betterFetch<V1ApiTypes.MeResponse>(
      `${API_ENDPOINT}/v1/me`,
    )

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
