import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import WishList from '@pages/wishlist/WishList';
import { store } from '@store/index';
import { removeMovieFromWishlist } from '@store/wishListSlice';
import '@testing-library/jest-dom';

// Mock Redux hooks and the navigate function
vi.mock('react-redux', async () => {
  const redux = await vi.importActual('react-redux');
  return {
    ...redux,
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  };
});

vi.mock('react-router-dom', async () => {
  const router = await vi.importActual('react-router-dom');
  return {
    ...router,
    useNavigate: vi.fn(),
  };
});

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

describe('WishList Component', () => {
  beforeEach(() => {
    vi.mocked(useSelector).mockReturnValue([
      {
        id: 1,
        original_title: 'Test Movie',
        backdrop_path: '/test.jpg',
        type: 'movie',
      },
    ]);
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <WishList />
        </BrowserRouter>
      </Provider>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders wishlist items correctly', () => {
    expect(screen.getByTestId('wishlist')).toBeInTheDocument();
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByAltText('Poster of Test Movie')).toBeInTheDocument();
  });

  test('navigates to the correct route when movie image is clicked', () => {
    const movieImage = screen.getByAltText('Poster of Test Movie');
    fireEvent.click(movieImage);
    expect(mockNavigate).toHaveBeenCalledWith('/movie/movie/1');
  });

  test('dispatches removeMovieFromWishlist action when delete icon is clicked', () => {
    const deleteIcon = screen.getByText('Delete');
    fireEvent.click(deleteIcon);
    expect(mockDispatch).toHaveBeenCalledWith(removeMovieFromWishlist('Test Movie'));
  });

  test('displays "No movies in your wishlist" when wishlist is empty', () => {
    vi.mocked(useSelector).mockReturnValue([]);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <WishList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('No movies in your wishlist yet!')).toBeInTheDocument();
  });
});
