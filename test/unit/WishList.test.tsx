/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
import React from "react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";

import WishList from "@pages/WishList";
import { useWishlist } from "@store/wishList";
import { toast } from "react-toastify";
import { renderWithProviders } from "./testUtils";

// --- Mock dependencies ---
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@store/wishList", () => ({
  useWishlist: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: { info: vi.fn(), success: vi.fn() },
}));

vi.mock("@components/layout/Layout", () => ({
  default: ({ children }: { children: React.ReactNode }) =>
    <div>{children}</div>,
}));

vi.mock("@components/common/Button", () => ({
  default: ({ onClick, text }: { onClick?: () => void; text: string }) =>
    <button onClick={onClick}>{text}</button>,
}));

vi.mock("@components/cards/MovieCard", () => ({
  MovieCard: ({ movie, onClick }: any) => (
    <div onClick={onClick}>{movie.title}</div>
  ),
}));

describe("WishList Page", () => {
  const movieMock = [
    {
      id: "1",
      title: "Inception",
      category: "Action",
      genres: ["Sci-Fi"],
    },
    {
      id: "2",
      title: "Titanic",
      category: "Romance",
      genres: ["Romance"],
    },
  ];

  beforeEach(() => {
    const remove = vi.fn();

    (useWishlist as any).mockReturnValue({
      items: movieMock,
      remove,
    });

    // Reset mocks
    mockNavigate.mockReset();
    vi.mocked(toast.info).mockReset();
  });

  it("renders movies grouped by genre", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<WishList />} />
      </Routes>
    );

    // Check movie titles
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("Titanic")).toBeInTheDocument();

    // Check genre headings
    expect(screen.getByText(/Sci-Fi/i)).toBeInTheDocument();
    expect(screen.getByText(/Romance/i)).toBeInTheDocument();
  });

  it("removes movie when Remove button is clicked", () => {
    const remove = vi.fn();
    (useWishlist as any).mockReturnValue({
      items: movieMock,
      remove,
    });

    renderWithProviders(
      <Routes>
        <Route path="/" element={<WishList />} />
      </Routes>
    );

    const removeButtons = screen.getAllByText("Remove");
    fireEvent.click(removeButtons[0]);

    expect(remove).toHaveBeenCalledWith("1");
    expect(toast.info).toHaveBeenCalledWith("Inception removed from wishlist");
  });

  it("shows message when wishlist is empty", () => {
    (useWishlist as any).mockReturnValue({
      items: [],
      remove: vi.fn(),
    });

    renderWithProviders(<WishList />);

    expect(screen.getByText(/Your wishlist is empty/i)).toBeInTheDocument();
  });
});
