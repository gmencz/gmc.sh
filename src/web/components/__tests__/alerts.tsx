import userEvent from '@testing-library/user-event'
import ErrorAlert from 'components/error-alert'
import SuccessAlert from 'components/success-alert'
import { render, screen } from 'test/next-testing-utils'

describe('ErrorAlert', () => {
  test('closes when close button is clicked', () => {
    let isOpen = true
    const { rerender } = render(
      <ErrorAlert
        isOpen={isOpen}
        onClose={() => {
          isOpen = false
        }}
      >
        Test error
      </ErrorAlert>,
    )

    screen.getByText(/test error/i)
    const closeButton = screen
      .getByText(/dismiss/i)
      .closest('button') as Element

    userEvent.click(closeButton)
    rerender(
      <ErrorAlert
        isOpen={isOpen}
        onClose={() => {
          isOpen = false
        }}
      >
        Test error
      </ErrorAlert>,
    )

    expect(screen.queryByText(/test error/i)).not.toBeInTheDocument()
  })
})

describe('SuccessAlert', () => {
  test('closes when close button is clicked', () => {
    let isOpen = true
    const { rerender } = render(
      <SuccessAlert
        isOpen={isOpen}
        onClose={() => {
          isOpen = false
        }}
      >
        Test success
      </SuccessAlert>,
    )

    screen.getByText(/test success/i)
    const closeButton = screen
      .getByText(/dismiss/i)
      .closest('button') as Element

    userEvent.click(closeButton)
    rerender(
      <SuccessAlert
        isOpen={isOpen}
        onClose={() => {
          isOpen = false
        }}
      >
        Test success
      </SuccessAlert>,
    )

    expect(screen.queryByText(/test success/i)).not.toBeInTheDocument()
  })
})
