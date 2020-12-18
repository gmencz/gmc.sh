describe('Sign in', () => {
  it('Opens app after signing in', () => {
    cy.visit('/')

    cy.get('a').contains('Sign in').click()

    cy.get('input#username').type('my_username')
    cy.get('input#password').type('my_supersecret_password')

    cy.get('button').contains('Sign in').click()
  })
})
