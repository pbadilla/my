/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import { renderWithProviders } from "./testUtils";

import MoviePage from "@pages/Movie";
import { screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, beforeEach, expect } from "vitest";

import { fetchMovie } from "../../src/services/fetchMovies";
import { useWishlist } from "@store/wishList";
import { toast } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// --- Mock dependencies ---
const mockFetchMovie = vi.fn();
vi.mock("@services/fetchMovies", () => ({ fetchMovie: mockFetchMovie }));
vi.mock("@store/wishList", () => ({ useWishlist: vi.fn() }));
vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), info: vi.fn() },
}));
vi.mock("@utils/tmdb", () => ({ getTmdbImage: (path: string) => path }));
vi.mock("@components/layout/Layout", () => ({
  default: ({ children }: { children: React.ReactNode }) =>
    <div>{children}</div>,
}));
vi.mock("@components/common/Button", () => ({
  default: ({ onClick, text }: { onClick?: () => void; text: string }) =>
    <button onClick={onClick}>{text}</button>,
}));
vi.mock("@components/common/Card", () => ({
  default: ({ children }: { children: React.ReactNode }) =>
    <div>{children}</div>,
}));
vi.mock("@pages/Loading", () => ({
  default: () => <div>Loading...</div>,
}));
vi.mock("@pages/NotFound", () => ({
  default: () => <div>NotFound</div>,
}));
vi.mock("@pages/Error", () => ({
  default: ({ message }: { message?: string }) => (
    <div>Error: {message}</div>
  ),
}));
vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
  QueryClient: vi.fn(() => ({})),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe("MoviePage", () => {
  const movieMock = {
    title: "Inception",
    posterUrl: "poster.jpg",
    category: "Action",
    rating: 9,
    release_date: "2010-07-16",
    runtime: 148,
    overview: "A mind-bending thriller",
  };

  beforeEach(() => {
    mockFetchMovie.mockResolvedValue(movieMock);

    const add = vi.fn();
    const mockWishlistState = {
      add,
      isInWishlist: () => false,
    };
    
    // Mock both the direct call and the selector call pattern
    (useWishlist as any).mockImplementation((selector: any) => {
      if (selector) {
        // When used as a selector: useWishlist((state) => state.isInWishlist(id))
        return selector(mockWishlistState);
      } else {
        // When used directly: const { add } = useWishlist()
        return mockWishlistState;
      }
    });

    // Mock useQuery to return the movie data
    (useQuery as any).mockReturnValue({
      data: movieMock,
      isLoading: false,
      isError: false,
      error: null,
    });
  });

  it("renders movie details and allows adding to wishlist", async () => {
    renderWithProviders(
      <Routes>
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>,
      {
        initialEntries: ["/movie/123"],
      }
    );

    const title = await screen.findByText("Inception");
    expect(title).toBeInTheDocument();

    const button = screen.getByText("Add to Wishlist");
    fireEvent.click(button);

    expect(toast.success).toHaveBeenCalledWith(
      "Inception has been added to your wishlist!"
    );
  });
});
