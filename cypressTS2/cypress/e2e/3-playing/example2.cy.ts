describe('template spec', () => {
  it('Contains "Kitchen Sink"', () => {
    cy.visit('https://example.cypress.io')

    // verify that the h1 element contains the expected string
    const title = 'Kitchen Sink'
    const titleElement = cy.get('h1').first()
    titleElement.should('include.text', title)
  })
})