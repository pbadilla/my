/// <reference types="cypress" />

describe('WishList Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/wishlist', { fixture: 'wishlist.json' }).as('getWishList');
    cy.visit('/wishlist');
    cy.wait('@getWishList');
  });

  it('renders the WishList component with Header, Body, and Footer', () => {
    cy.get('[data-testid="wishlist"]').should('exist');
    cy.get('header').should('exist');
    cy.get('[data-testid="wishlist-body"]').should('exist');
    cy.get('footer').should('exist');
  });

  it('displays no wishlist message', () => {
    cy.intercept('GET', '**/wishlist', { fixture: 'emptyWishlist.json' }).as('getEmptyWishList');
    cy.visit('/wishlist');
    cy.wait('@getEmptyWishList');
    cy.get('[data-testid="wishlist-no-wishlist"]').should('exist');
    cy.get('p.no-wishlist').contains('No movies in your wishlist yet!').should('exist');
  });

  it('renders movies in the wishlist', () => {
    cy.get('[data-testid="wishlist-list"]').within(() => {
      cy.get('[data-testid="wishlist-item"]').should('have.length', 2);
      cy.get('[data-testid="wishlist-item"]').first().within(() => {
        cy.get('img').should('have.attr', 'alt', 'Poster of Movie Title 1');
        cy.get('span').contains('Movie Title 1');
      });
    });
  });

  it('navigates to movie details on click', () => {
    cy.get('[data-testid="wishlist-item"]').first().click();
    cy.url().should('include', '/movie/firstMovieType/firstMovieId');
  });

  it('removes a movie from the wishlist', () => {
    cy.get('[data-testid="wishlist-item"]').first().within(() => {
      cy.get('.delete-icon').click();
    });
    cy.get('[data-testid="wishlist-list"]').should('have.length', 1);
  });
});
