import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from 'test/next-testing-utils'
import Header from '../header'
import userEvent from '@testing-library/user-event'
import Home from '../../pages'
import { SafeUser } from '@types'

function openMenu() {
  const openMenuButton = screen.getByText(/open main menu/i)
  userEvent.click(openMenuButton)
  screen.getByRole('menu')
}

describe('MobileMenu', () => {
  test('closes menu when close menu button is clicked', async () => {
    // We have to render the header and not the mobile menu because
    // the button to open the mobile menu is on the header.
    render(<Header isAuthenticated={false} />)
    openMenu()

    const closeMenuButton = screen.getByText(/close main menu/i)
    userEvent.click(closeMenuButton)

    await waitForElementToBeRemoved(() => screen.getByRole('menu'))
  })

  test('closes menu when escape key is pressed', async () => {
    render(<Header isAuthenticated={false} />)
    openMenu()

    fireEvent.keyDown(document.body, {
      key: 'Escape',
      keyCode: 27,
      which: 27,
    })

    await waitForElementToBeRemoved(() => screen.getByRole('menu'))
  })

  test('closes menu when clicked/tapped outside', async () => {
    const mockedUser: SafeUser = {
      id: '1',
      username: 'test',
      email: 'test@example.com',
      createdAt: new Date(),
      bio: null,
      location: null,
      name: null,
      publicEmail: null,
      twitterUsername: null,
      website: null,
      profilePicture: '',
      updatedProfilePictureAt: new Date(),
    }

    render(<Home user={mockedUser} />)
    openMenu()

    // Just click on some element on the page that's not in the mobile menu.
    const emailSubscriptionInput = screen.getByLabelText(/email/i)
    userEvent.click(emailSubscriptionInput)
    await waitForElementToBeRemoved(() => screen.getByRole('menu'))
  })
})
