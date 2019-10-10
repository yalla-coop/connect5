describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.exec('npm run build:data:prd');
  });

  it('successfully loads', () => {
    cy.visit('/');
  });
});
