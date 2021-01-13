import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from 'test/next-testing-utils'
import AccountOverview from '..'

test('displays the amount of schedules the user has', async () => {
  render(<AccountOverview />)

  const { queryByText } = within(
    screen.getByText(/^schedules/i).nextElementSibling as HTMLElement,
  )

  await waitForElementToBeRemoved(() => screen.getByText(/loading schedules/i))

  expect(queryByText('20')).toBeInTheDocument()
})
