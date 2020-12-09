import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

import FormPage from '../../support/pageobjects/formPage'
const formPage = new FormPage

Given('I open the form page', () => {
  formPage.openPage()
})
Then('I see {string} in the title', (title) => {
  formPage.validateTitle(title)
})

Given ('I insert {string} {string}', (name, lastname) => {
  formPage.fillData(name, lastname)
})