/// <reference types="cypress"/>

it('Google Search', function(){

    cy.visit('https://google.com')

    //cy.get('#APjFqb').type('Automation Step By Step{Enter}')
    cy.get('textarea[type="search"]').type('Automation Step By Step{Enter}')

    //cy.contains('Search').click()

    
})