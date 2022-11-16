// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command -
import { faker } from '@faker-js/faker';

Cypress.Commands.add('createUser', () => {
  const user = {
    name: faker.lorem.words(1),
    email: faker.internet.email(),
    password: faker.internet.password(),
    image: faker.image.animals(),
    city: 'RJ'
  };

  cy.request('POST', 'http://localhost:5000/signup', user).then(data => {
    return cy.wrap(JSON.parse(data.requestBody));
  });
});

Cypress.Commands.add('createUserAndLogin', user => {
  cy.request('POST', 'http://localhost:5000/signup', user).then(() => {
    cy.request('POST', 'http://localhost:5000/signin', {
      email: user.email,
      password: user.password
    }).then(res => {
      window.localStorage.setItem('user', JSON.stringify(res.body));
    });
  });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
