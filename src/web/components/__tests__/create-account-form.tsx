import { V1ApiTypes } from '@gmcsh/shared'
import userEvent from '@testing-library/user-event'
import CreateAccountForm from 'components/create-account-form'
import {
  mockRouter,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from 'test/next-testing-utils'
import { server, rest } from 'test/server'
import { API_ENDPOINT } from 'utils/constants'

describe('CreateAccountForm', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation()
  })

  test('redirects to /app after successful account creation', async () => {
    const fakeUser = {
      username: 'testUsername',
      email: 'testEmail@example.com',
      password: 'testPassword123',
    }

    server.use(
      rest.post(`${API_ENDPOINT}/v1/auth/register`, (_req, res, ctx) => {
        const user: V1ApiTypes.RegisterResponse = {
          user: {
            id: 'test-1',
            username: fakeUser.username,
            email: fakeUser.email,
            createdAt: new Date(),
            bio: null,
            location: null,
            name: null,
            publicEmail: null,
            twitterUsername: null,
            website: null,
          },
        }

        return res(
          ctx.status(200),
          ctx.json({
            user,
          }),
        )
      }),
    )

    render(<CreateAccountForm />)

    const usernameInput = screen.getByLabelText(/username/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    userEvent.type(usernameInput, fakeUser.username)
    userEvent.type(emailInput, fakeUser.email)
    userEvent.type(passwordInput, fakeUser.password)

    const createAccountButton = screen.getByRole('button', {
      name: /create account/i,
    })

    userEvent.click(createAccountButton)

    await waitFor(() => screen.getByText(/loading.../i))
    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))

    expect(mockRouter.push).toHaveBeenCalled()
    expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith('/app')
  })

  test('validates data input by user in form before submitting', async () => {
    render(<CreateAccountForm />)
    const usernameInput = screen.getByLabelText(/username/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    const createAccountButton = screen.getByRole('button', {
      name: /create account/i,
    })

    userEvent.click(createAccountButton)

    await waitFor(() =>
      screen.getByText(/there were 3 errors with your submission/i),
    )

    expect(screen.queryByText(/username is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/email is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/password is required/i)).toBeInTheDocument()

    userEvent.type(usernameInput, 'testUsername')
    await waitFor(() =>
      expect(
        screen.queryByText(/username is required/i),
      ).not.toBeInTheDocument(),
    )

    expect(screen.queryByText(/email is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/password is required/i)).toBeInTheDocument()

    userEvent.type(emailInput, 'test@example.com')
    userEvent.type(passwordInput, '123')

    await waitFor(() =>
      screen.getByText(/your password must be at least 6 characters long/i),
    )
  })

  test('displays error message if something went wrong upon account creation', async () => {
    const fakeUser = {
      username: 'testUsername',
      email: 'testEmail@example.com',
      password: 'testPassword123',
    }

    server.use(
      rest.post(`${API_ENDPOINT}/v1/auth/register`, (_req, res, ctx) => {
        return res(
          ctx.status(409),
          ctx.json({
            message: 'Taken username',
          }),
        )
      }),
    )

    render(<CreateAccountForm />)
    const usernameInput = screen.getByLabelText(/username/i)
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    userEvent.type(usernameInput, fakeUser.username)
    userEvent.type(emailInput, fakeUser.email)
    userEvent.type(passwordInput, fakeUser.password)

    const createAccountButton = screen.getByRole('button', {
      name: /create account/i,
    })

    userEvent.click(createAccountButton)

    await waitFor(() => screen.getByText(/loading.../i))
    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))

    expect(
      screen.queryByText(/there was an error creating your account/i),
    ).toBeInTheDocument()

    expect(screen.queryByText(/taken username/i)).toBeInTheDocument()
  })
})
