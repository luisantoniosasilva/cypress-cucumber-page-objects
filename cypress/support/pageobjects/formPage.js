/// <reference types="Cypress" />

import FormElements from '../elements/formElements'
const formElements = new FormElements
const url = Cypress.config("baseUrl")

class FormPage {
    openPage() {
        cy.visit(url)
    }

    validateTitle(title) {
        cy.title().should('eq', title)
    }

    fillData(name, lastname) {
        cy.get(formElements.name()).type(name)
        cy.get(formElements.lastname()).type(lastname)
    }
}

export default FormPage;