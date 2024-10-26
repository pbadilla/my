// cypress/e2e/home.spec.js
describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/'); // Hit your Vite dev server
  });

  it('renders Header, Carousels, and Footer', () => {
    // Assert the header is present
    cy.contains('Mock Header').should('be.visible');

    // Assert carousels are rendered
    cy.get('.mock-carousel').should('have.length', 3); // Ensure the mock has the right class

    // Assert footer is present
    cy.contains('Mock Footer').should('be.visible');
  });
});
