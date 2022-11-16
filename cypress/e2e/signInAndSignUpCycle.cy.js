import { faker } from '@faker-js/faker';

describe('Testa o SignUp', () => {
  it('Testa se cadastra um usuário com sucesso', () => {
    const user = {
      name: faker.lorem.words(2),
      email: faker.internet.email(),
      image: faker.internet.avatar(),
      password: faker.lorem.words(2)
    };

    cy.visit('http://localhost:3000/sign-up');
    cy.get('#name').type(user.name);
    cy.get('#email').type(user.email);
    cy.get('#image').type(user.image);
    cy.get('#password').type(user.password);

    cy.contains('SP').click();
    cy.get('#cadastrar').click();

    cy.url().should('equal', 'http://localhost:3000/');

    cy.get('#email').type(user.email);
    cy.get('#password').type(user.password);
    cy.contains('Entrar').click();

    cy.url().should('equal', 'http://localhost:3000/market');
  });
});
