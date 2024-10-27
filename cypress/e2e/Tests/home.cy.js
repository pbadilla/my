/// <reference types="cypress" />

describe('Home Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the Home component with Header, Body, and Footer', () => {
    cy.get('[data-testid="home"]').should('exist');
    cy.get('header').should('exist');
    cy.get('[data-testid="home-body"]').should('exist');
    cy.get('footer').should('exist');
  });

  it('renders three Carrousel components with correct types', () => {
    cy.get('[data-testid="home-body"] .content')
      .within(() => {
        cy.get('[data-testid="carousel"]').should('have.length', 3);
        cy.get('[data-testid="carousel"]').eq(0).should('have.attr', 'data-type', 'top_rated');
        cy.get('[data-testid="carousel"]').eq(1).should('have.attr', 'data-type', 'popular');
        cy.get('[data-testid="carousel"]').eq(2).should('have.attr', 'data-type', 'upcoming');
      });
  });

  it('scrolls through carousels and verifies items are displayed', () => {
    cy.get('[data-testid="carousel"]').each(($carousel) => {
      cy.wrap($carousel)
        .scrollTo('right')
        .wait(500)
        .scrollTo('left');
      cy.wrap($carousel).within(() => {
        cy.get('.carousel-item').should('have.length.greaterThan', 0);
      });
    });
  });
});
