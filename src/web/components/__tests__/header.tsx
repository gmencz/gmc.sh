import { render, screen } from 'test/next-testing-utils'
import Header from '../header'

describe('Header', () => {
  test('displays the right button/link based on if the user is logged in or not', () => {
    const { rerender } = render(<Header isAuthenticated={false} />)
    const authenticatedText = /open app in browser/i
    const unauthenticatedText = /sign in/i

    expect(screen.queryByText(authenticatedText)).not.toBeInTheDocument()
    screen.getByText(unauthenticatedText)

    rerender(<Header isAuthenticated />)
    expect(screen.queryByText(unauthenticatedText)).not.toBeInTheDocument()
    screen.getByText(authenticatedText)
  })
})
