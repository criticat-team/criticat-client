// https://docs.cypress.io/api/introduction/api.html

describe('Example', () => {
  it('Is a good example', () => {
    cy.visit('/');
    cy.contains('h1', 'Home');
  });
});
