describe('Testa rota SignIn', () => {
  it('Verifica se usuário logou no sistema e entrou na rota /market', () => {
    cy.visit('http://localhost:3000/');

    cy.createUser().then(user => {
      cy.get('#email').type(user.email);
      cy.get('#password').type(user.password);
    });

    cy.intercept('POST', 'http://localhost:5000/signin').as('signIn');

    cy.get('#submit').click();

    cy.wait('@signIn');

    cy.url().should('equal', 'http://localhost:3000/market');
  });
});
