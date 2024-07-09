/// <reference types="cypress"/>

it('google search', () =>{
    cy.visit('https://google.com')

    cy.get('textarea[name="q"]').type('Automation Step by Step{Enter}')

    // cy.contains('Google Search').click()
})