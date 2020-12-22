describe('Update profile picture', () => {
  it('Allows cropping new profile picture before setting it', () => {
    const testSession =
      'Fe26.2*1*c2fee07ed39dfe7fe3d524d5f88db671151b22f83e227ad8cf6ab9c3c941c597*GELp7ES3ng3UlDxcJqAQSQ*c3XOHWDrgxRxLRD2WxEMdzW6a1kQjeFLTQJr6vqLtl5c05TuLnMXR49odKEX3-4Fo_U1feDMAOKiSa7nwA6g5r_xQ6ygknSy47bIpmBHtfcD79qBgekWUA53tuVPL4Hb8HPYPnKbLB397VyzDmIIn8f01lrGatQ324zoQvMFI6ZngvrbKPjKY0NN8upGCXaBIbmIxDhgEgOHNbqyDNzA41k5xxhl9Ca2fhM4N0SkRT1iUKD6E78Ytr5ASMcGoJv2HSChUU1DGOYIwmxJ-r1UQVrIgAyxAFQm5JEtVUzm4THDw7OBEoWsuH_8XAvt_2Z-5QULmeDXrKZ5J6f1Bk6nbtJx9svIpZb6JTYmcLKRXnRBU7jHYX27kO-bqEvTty_4VJBjrFPKb2abJfCcGSnW3FqeUIc4fGSF2e93iE7kV37cU4p7YlENVXJjrQgKahCEqzXJAqxcw_x5KH4hrByWA38zuHbV2WdDB32TCLm1MfFWstPzW0f4_mtEbbkHCyUX3xlbipajcSDAEQ6xbTXXsA*1609952521845*7ec38c7743799ba2c6ed7f80f2ddba988a00d314f8bff1d08591489cf76532e4*zFKg_i7gv48yuCQH8nAA-9a9Y7foHuY64cAO2t_cL04'

    cy.setCookie('__session', testSession)

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
