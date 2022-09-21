# Teste Automatizado | Cypress + Cucumber + Page Objects
## Introdução
> :information_source:  Se você está desejando utilizar o Cypress 10 em sua aplicação a configuração abaixo se encontra obsoleta, favor visitar o projeto [
cypress-10-cucumber-preprocessor](https://github.com/luisantoniosasilva/cypress-10-cucumber-preprocessor). Saliento que a organização do seu projeto utilizando o padrão de projeto **page_objects** continua neste documento.

### O que é Cypress
Cypress é um **framework** utilizado para automação de testes end to end. Atualmente, utiliza JavaScript como linguagem de programação

### O que é Cucumber
Cucumber é uma ferramenta de software que suporta o desenvolvimento orientado pelo comportamento. O ponto central da abordagem do BDD do pepino é o seu analisador de idioma comum chamado Gherkin.

## Configurando o Ambiente

 1. Instalar o [Node.js](https://nodejs.org/en/) 
 2. Instalar o [VS Code](https://code.visualstudio.com/) 
 3. Instalar o [Cypress](https://www.cypress.io/)

## Configurando o Cypress
Dentro da pasta do seu projeto, abra um terminal e execute os seguinte comando
``` bash
npm init -y
npm install cypress --save-dev
``` 
Para executar o Cypress de uma forma mais simples vamos editar o arquivo package.json criado acima, inserindo o trecho abaixo dentro da chave scripts.
```bash 
"cypress": "cypress open"
```
![enter image description here](https://miro.medium.com/max/700/1*CZMSujuOoPId4BpQ6F7adA.png)

Na sequência, no terminal, deverá executar 
```bash
npm run cypress
```
## Instalando e Configurando o [Cypress-Cucumber-Preprocessor](https://www.npmjs.com/package/cypress-cucumber-preprocessor)

Dentro da pasta do seu projeto, abra um terminal e execute os seguinte comando
```bash
npm install --save-dev cypress-cucumber-preprocessor
```
Adicione ao arquivo cypress/plugins/index.js o seguinte script:
``` JS
const cucumber = require('cypress-cucumber-preprocessor').default
module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
}
```
![enter image description here](https://miro.medium.com/max/700/1*uFrQC2jdFKCX946qBqDueA.png)

Adicione ao arquivo cypress.json o seguinte script:
``` json
{
  "testFiles": "**/*.feature"
}
```
![enter image description here](https://miro.medium.com/max/700/1*CBQnpqx46Vm3oS4mM3EX9w.png)

Adicione ao arquivo package.json o seguinte script:
``` json
"cypress-cucumber-preprocessor": {
  "nonGlobalStepDefinitions": true
}
```
## Estrutura do Projeto
### Pastas
Neste artigo focaremos nas pastas que manipularemos para executarmos o projeto.

![enter image description here](https://miro.medium.com/max/263/1*naOAXNTHKKsPxu28ugiV6w.png)

1. **integration:** nesta pasta colocamos os nossos arquivos com os cenários de teste escritos no formato **BDD** e uma subpasta com o nome do arquivo de cenário que irá conter nossos **steps** em formato JS
2. **support/pageobjects:** aqui colocaremos os scripts feitos em Cypress. 
3. **support/elements:** nessa pasta colocaremos o mapeamento de todos nosso elementos das páginas.

## Configurando a URL padrão
Configurar o arquivo **cypress.json**
``` json
{
    "baseUrl": "URL_DO_SITE_DESEJADO"
}
```
![Neste caso estamos utilizando o site https://demoqa.com/automation-practice-form/](https://miro.medium.com/max/700/1*ftqI_tgC4AkGuEx_Ry-c-Q.png)
## Criando o Teste
Criar um arquivo com o cenário de teste escrito em BDD. Ele deve ficar dentro de **cypress/integration** e ter a extensão **.feature**.
![enter image description here](https://miro.medium.com/max/700/1*-_5HxvAVU6R0ig_OzLzRKg.png)
``` Gherkin
Feature: The form

    I want fill the form

    @login
    Scenario: Opening the form page
        Given I open the form page
        Then I see "ToolsQA" in the title

    @cadastro
    Scenario: Fill the form
        Given I insert "Luis" "Silva"
```
Agora precisamos analisar nosso teste e mapear todos os elementos que precisaremos para nosso texto, como campos de preenchimento, botões, caixas de seleção, etc. 
Este arquivo deve ser criado dentro de **cypress/support/elements** e deve ter seu nome formado pelo nome do arquivo que utilizamos anteriormente para o arquivo feature acrescido da palavra "Elements".
Ex: pageElements.js
![enter image description here](https://miro.medium.com/max/700/1*6YzLOgKmXs017EmtDT6hpA.png)
```JS
class FormElements {
    name = () => { return '#firstName' }
    lastname = () => { return '#lastName' }
}
export default FormElements;
```
Agora dentro de **cypress/support/pageobjects** iremos criar um arquivo com as funções e chamadas cypress. 
Este arquivo deve ter seu nome formado pelo nome do arquivo que utilizamos anteriormente para o arquivo feature acrescido da palavra "Page".
Ex: formPage.js
Observe que neste arquivo invocamos os elementos mapeados no passo anterior para criação de funções que definem nossas ações na página.
![enter image description here](https://miro.medium.com/max/700/1*1K913U89kwnKWf8IuwR8EQ.png)
``` JS
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
```
Agora dentro da pasta **cypress/integration/** criaremos uma pasta com o mesmo nome do arquivo de extensão feature.
Dentro dessa nova pasta criaremos um arquivo com o nome do arquivo de extensão feature acrescido da palavra "Steps".
Ex: formSteps.js
Neste arquivo criamos os steps e dentro de cada step executaremos uma ou mais funções criadas dentro do nosso arquivo page
![enter image description here](https://miro.medium.com/max/700/1*kh16g3L2ovIigON7x8BVAg.png)
``` JS
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
// Caso esteja utilizando Cypress 10 a linha acima deverá importar ser:
// import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
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
```
## Referências Utilizadas
MEDIUM. **Testes automatizados com Cypress e Cucumber**. Disponível em: https://medium.com/cwi-software/testes-automatizados-com-cypress-e-cucumber-d78b211da766. 

MEDIUM. **Instalando o Cypress sem mistérios**. Disponível em: https://medium.com/gruponewway/instalando-o-cypress-sem-mistérios-6d6ee66b78d8. 

WIKIPÉDIA. **Cucumber (software)**. Disponível em: https://en.wikipedia.org/wiki/Cucumber_(software).
