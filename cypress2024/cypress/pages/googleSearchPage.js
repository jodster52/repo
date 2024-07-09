export class googleSearch{

    navigate(){
        cy.visit('https://google.com')
    }

    googleSearchForCalc(){
        cy.get('textarea[name="q"]').type('Automation Step by Step{Enter}')
    }


}