import { V1ApiTypes } from '@gmcsh/shared'
import userEvent from '@testing-library/user-event'
import SignInForm from '../sign-in-form'
import {
  mockRouter,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../test/next-testing-utils'
import { server, rest } from '../../test/server'
import { API_ENDPOINT } from '../../utils/constants'

function renderSignIn() {
  render(<SignInForm />)

  const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement
  const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement
  const signInButton = screen.getByRole('button', {
    name: /sign in/i,
  }) as HTMLButtonElement

  expect(signInButton).toBeDisabled()

  return {
    usernameInput,
    passwordInput,
    signInButton,
  }
}

describe('SignInForm', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation()
  })

  test('redirects user to /app after successful login', async () => {
    const { usernameInput, passwordInput, signInButton } = renderSignIn()

    server.use(
      rest.post(`${API_ENDPOINT}/v1/auth/sign-in`, (_req, res, ctx) => {
        const mockedUser: V1ApiTypes.MeResponse = {
          id: '1',
          username: 'test',
          email: 'test@example.com',
          createdAt: new Date(),
        }

        return res(
          ctx.status(200),
          ctx.json({
            ...mockedUser,
          }),
        )
      }),
    )

    userEvent.type(usernameInput, 'invaliduser')
    userEvent.type(passwordInput, 'invalidpassword')
    userEvent.click(signInButton)

    await waitFor(() => screen.getByText(/loading.../i))
    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))

    expect(mockRouter.push).toHaveBeenCalled()
    expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith('/app')
  })

  test('displays error to user if credentials fails client side validation', async () => {
    const { usernameInput, passwordInput, signInButton } = renderSignIn()

    userEvent.type(usernameInput, 'test')
    userEvent.type(passwordInput, '123')
    userEvent.click(signInButton)

    await waitFor(() =>
      screen.getByText('Your password must be at least 6 characters long.'),
    )
  })

  test('displays error to user if provided credentials are invalid', async () => {
    const { usernameInput, passwordInput, signInButton } = renderSignIn()

    const apiErrorMessage =
      'Wrong username or password, please check your spelling.'

    server.use(
      rest.post(`${API_ENDPOINT}/v1/auth/sign-in`, (_req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            info: {},
            message: apiErrorMessage,
          }),
        )
      }),
    )

    userEvent.type(usernameInput, 'invaliduser')
    userEvent.type(passwordInput, 'invalidpassword')
    userEvent.click(signInButton)

    await waitFor(() => screen.getByText(/loading.../i))
    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))

    screen.getByText(apiErrorMessage)
  })
})
