describe('landing page test', () => {
  it('contains titles', () => {
    cy.visit('/')
    cy.get('[data-test="landing-titles"]').should('exist')
    cy.get('[data-test="landing-titles"]').should('have.length', 1)
  })
})