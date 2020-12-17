describe('Update profile picture', () => {
  it('Allows cropping new profile picture before setting it', () => {
    cy.setCookie('__session', '123')

    cy.visit('/app')

    cy.fixture('images/test_image.jpg').as('newProfilePicture')
    cy.get<HTMLInputElement>('input#avatar').then(function (el) {
      const blob = Cypress.Blob.base64StringToBlob(
        this.newProfilePicture,
        'image/jpeg',
      )
      const file = new File([blob], 'test_image.jpg', {
        type: 'image/jpeg',
      })

      const list = new DataTransfer()

      list.items.add(file)
      const myFileList = list.files

      el[0].files = myFileList
      el[0].dispatchEvent(new Event('change', { bubbles: true }))

      // Wait until modal transition is done to perform click
      cy.wait(500)
      cy.contains('Set new profile picture').click()

      cy.get('.bg-green-50.p-4.fixed.top-5.right-5.z-10').within(() => {
        cy.get('span.sr-only').contains('Dismiss').parent().click()
      })

      cy.get('img[alt=Profile]')
        .should('have.attr', 'src')
        .should('include', 'test_image.jpg')
    })
  })
})
