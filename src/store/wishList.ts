import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Movie } from "../types/movies";

type WishlistState = {
  items: Movie[];
  add: (movie: Movie) => void;
  remove: (id: string) => void;
  isInWishlist: (id: string) => boolean;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (movie) => {
        if (!get().items.find((m) => m.id === movie.id)) {
          set({ items: [...get().items, movie] });
        }
      },
      remove: (id) => set({ items: get().items.filter((m) => m.id !== id) }),
      isInWishlist: (id) => !!get().items.find((m) => m.id === id),
    }),
    { name: "wishlist-storage" }
  )
);

// For Playwright tests
export const __setWishlistForTests = (movies: Movie[]) => {
  useWishlist.setState({ items: movies });
};