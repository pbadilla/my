/// <reference types="cypress" />

describe('Movie Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/movie/**', { fixture: 'movie.json' }).as('getMovie');
    cy.visit('/movie/123/some-type');
    cy.wait('@getMovie');
  });

  it('renders the Movie component with Header, Body, and Footer', () => {
    cy.get('[data-testid="movie"]').should('exist');
    cy.get('header').should('exist');
    cy.get('[data-testid="movie-body"]').should('exist');
    cy.get('footer').should('exist');
  });

  it('displays loading state', () => {
    cy.intercept('GET', '**/movie/**', { delay: 1000 }).as('getMovieLoading');
    cy.visit('/movie/123/some-type');
    cy.get('p').contains('Loading...').should('exist');
  });

  it('displays error state', () => {
    cy.intercept('GET', '**/movie/**', { statusCode: 500 }).as('getMovieError');
    cy.visit('/movie/123/some-type');
    cy.wait('@getMovieError');
    cy.get('p').contains('Error:').should('exist');
  });

  it('renders movie details correctly', () => {
    cy.get('[data-testid="movies-container"]').within(() => {
      cy.get('[data-testid="movie-title"]').contains('Movie Title');
      cy.get('[data-testid="movie-overview"]').contains('Movie Overview');
      cy.get('[data-testid="movie-popularity"]').contains('1234');
      cy.get('[data-testid="movie-genre"]').contains('Genre');
    });
  });

  it('adds movie to wishlist', () => {
    cy.get('[data-testid="movie-actions"]').within(() => {
      cy.get('button').contains("Add to whistList").click();
    });
    cy.get('p').contains('Movie added to wishlist').should('exist');
  });

  it('navigates to movie homepage', () => {
    cy.get('[data-testid="movie-actions"]').within(() => {
      cy.get('button').contains("Go to movie's homepage").click();
    });
    cy.url().should('include', 'https://www.themoviedb.org');
  });
});
