// / <reference types="Cypress" />
const url = 'localhost:3000';

context('login page', () => {
  beforeEach(() => {
    cy.visit(`http://${url}/login`);
  });

  it('enter users credentials and login successfully', () => {
    cy.get('[data-testid=username]').type('alex@connect5.uk');
    cy.get('[data-testid=password]').type('123456');

    cy.get('[data-testid=submit]').click();
    cy.get('[data-testid=dashboard]');
  });
});
