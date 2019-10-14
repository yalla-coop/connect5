describe('should login correctly', () => {
  beforeEach(() => {
    // clear cookies again after visiting to remove
    // any 3rd party cookies picked up such as cloudflare
    Cypress.Cookies.debug(true);
  });

  it('ssss', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-test-id="trainer-login"]').click();
    cy.location('href').should('eq', 'http://localhost:3000/login');

    cy.get('[data-test-id="email"]').type('tez.cook@hants.gov.uk');
    cy.get('[data-test-id="password"]').type('123456');
    cy.get('[data-test-id="submit"]').click();

    cy.location('href').should('eq', 'http://localhost:3000/dashboard');
    cy.getCookie('token').should('have.property', 'name', 'token');
  });
});
