import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Movie from '@pages/movie/Movie';
import { store } from '@store/index';
import '@testing-library/jest-dom';

vi.mock('@hooks/useFetch', () => ({
  useFetchData: vi.fn(() => ({
    isLoading: false,
    apiData: {
      id: 1,
      original_title: 'Test Movie',
      backdrop_path: '/test.jpg',
      overview: 'This is a test overview.',
      popularity: 100,
      genres: [{ name: 'Drama' }],
      production_companies: [{ name: 'Test Company', origin_country: 'US' }],
      homepage: 'http://example.com',
    },
    serverError: null,
  })),
}));

vi.mock('react-redux', async () => {
  const redux = await vi.importActual('react-redux');
  return {
    ...redux,
    useDispatch: () => vi.fn(),
  };
});

describe('Movie Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Movie />
        </BrowserRouter>
      </Provider>
    );
  });

  test('renders the movie details correctly', () => {
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('This is a test overview.')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  test('calls addWishList function on button click', () => {
    const addWishListButton = screen.getByText('Add to whistList');
    fireEvent.click(addWishListButton);
  });

  test("opens the movie's homepage on button click", () => {
    const homepageButton = screen.getByText("Go to movie's homepage");
    expect(homepageButton).toHaveAttribute('href', 'http://example.com');
  });

  test('displays loading text when loading', () => {
    vi.mocked(useFetchData).mockReturnValueOnce({
      isLoading: true,
      apiData: null,
      serverError: null,
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Movie />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error text on server error', () => {
    vi.mocked(useFetchData).mockReturnValueOnce({
      isLoading: false,
      apiData: null,
      serverError: 'Failed to fetch data',
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Movie />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
  });
});
