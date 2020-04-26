// https://docs.cypress.io/api/introduction/api.html

describe('Navigation', () => {
  it('Should load home view', () => {
    cy.visit('/');
    cy.get('[data-cy="view.home"]').should('exist');
  });

  it('Should load category view [movies]', () => {
    cy.visit('/movies');
    cy.get('[data-cy="view.category-home"]').should('exist');
  });

  it('Should load category view [tv]', () => {
    cy.visit('/movies');
    cy.get('[data-cy="view.category-home"]').should('exist');
  });

  it('Should load category view [games]', () => {
    cy.visit('/movies');
    cy.get('[data-cy="view.category-home"]').should('exist');
  });

  it('Should load category view [books]', () => {
    cy.visit('/movies');
    cy.get('[data-cy="view.category-home"]').should('exist');
  });

  it('Should redirect to home in unexisting category view', () => {
    cy.visit('/cars');
    cy.get('[data-cy="view.home"]').should('exist');
  });
});
