// E2E test for registration and login flow using Cypress
// Place this file in your Cypress integration folder if using Cypress, or adapt for Playwright

describe('User Registration and Login Flow', () => {
  const testUser = {
    username: `testuser_${Date.now()}`,
    password: 'TestPassword123',
    email: `testuser_${Date.now()}@example.com`
  }

  it('should register a new user', () => {
    cy.visit('/signup')
    cy.get('input[name="username"]').type(testUser.username)
    cy.get('input[name="email"]').type(testUser.email)
    cy.get('input[name="password"]').type(testUser.password)
    cy.get('button[type="submit"]').click()
    // Expect redirect or success message
    cy.url().should('not.include', '/signup')
    cy.contains('Welcome').should('exist')
  })

  it('should login with registered user', () => {
    cy.visit('/signin')
    cy.get('input[name="username"]').type(testUser.username)
    cy.get('input[name="password"]').type(testUser.password)
    cy.get('button[type="submit"]').click()
    // Expect redirect or success message
    cy.url().should('not.include', '/signin')
    cy.contains('Welcome').should('exist')
  })
})
