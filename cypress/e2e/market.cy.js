import { faker } from '@faker-js/faker';

describe('Testa a rota /market', () => {
  it('Faz login direto pelo backend depois entra direto na rota', async () => {
    const user = {
      name: faker.lorem.words(1),
      email: faker.internet.email(),
      password: faker.internet.password(),
      image: faker.image.animals(),
      city: 'RJ'
    };

    cy.createUserAndLogin(user);

    cy.visit('http://localhost:3000/market');

    cy.get('#username').should('contain.text', user.name);
  });
});
