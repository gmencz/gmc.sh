import userEvent from '@testing-library/user-event'
import SubscribeToReleaseForm from 'components/subscribe-to-release-form'
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from 'test/next-testing-utils'
import { server, rest } from 'test/server'
import { API_ENDPOINT } from 'utils/constants'

describe('SubscribeToReleaseForm', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation()
  })

  test('displays success message to user if verification email was sent successfully', async () => {
    const mockEmail = 'test@example.com'
    server.use(
      rest.post(
        `${API_ENDPOINT}/v1/mailing/verify-release-subscription`,
        (_req, res, ctx) => {
          return res(
            ctx.json({
              subscriberEmail: mockEmail,
            }),
          )
        },
      ),
    )

    render(<SubscribeToReleaseForm />)

    const emailInput = screen.getByLabelText(/email/i)
    userEvent.type(emailInput, mockEmail)

    const submitButton = screen.getByText(/notify me/i)
    userEvent.click(submitButton)

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).toBeInTheDocument(),
    )
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    const { getByText: getByTextWithinSuccessAlert } = within(
      screen.getByText(/an email has been sent/i),
    )

    getByTextWithinSuccessAlert(mockEmail)
  })

  test(`displays error message to user if something went wrong or if they're already subscribed`, async () => {
    const mockEmail = 'test@example.com'
    const alreadySubscribedErrorMesage =
      "You're already subscribed to the app release mailing list and will be notified when gmc.sh is out!"

    server.use(
      rest.post(
        `${API_ENDPOINT}/v1/mailing/verify-release-subscription`,
        (_req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              message: alreadySubscribedErrorMesage,
              info: {
                listId: 4,
                subscriberEmail: mockEmail,
              },
            }),
          )
        },
      ),
    )

    render(<SubscribeToReleaseForm />)

    const emailInput = screen.getByLabelText(/email/i)
    userEvent.type(emailInput, mockEmail)

    const submitButton = screen.getByText(/notify me/i)
    userEvent.click(submitButton)

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).toBeInTheDocument(),
    )
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    screen.getByText(alreadySubscribedErrorMesage)
  })

  test(`displays error message to user if they tried to subscribe without providing an email or if they provided an email with invalid format`, async () => {
    render(<SubscribeToReleaseForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByText(/notify me/i)
    userEvent.click(submitButton)

    await waitFor(() =>
      expect(
        screen.queryByText(/please enter your email/i),
      ).toBeInTheDocument(),
    )

    screen.getByText(/please enter your email/i)
    const alertCloseButton = screen
      .getByText(/dismiss/i)
      .closest('button') as Element

    userEvent.click(alertCloseButton)

    userEvent.type(emailInput, 'invalidEmail@')
    userEvent.click(submitButton)

    await waitFor(() =>
      expect(
        screen.queryByText(/please enter a valid email/i),
      ).toBeInTheDocument(),
    )
  })
})
