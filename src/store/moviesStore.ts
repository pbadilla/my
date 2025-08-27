import type { Movie } from "../types/movies";
import { create } from "zustand";

interface MoviesState {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  addMovies: (movies: Movie[]) => void;
  getMovieById: (id: string) => Movie | undefined;
}

export const useMoviesStore = create<MoviesState>((set, get) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
  addMovies: (movies) =>
    set((state) => ({
      movies: [...state.movies, ...movies.filter(
        (m) => !state.movies.find((s) => s.id === m.id)
      )],
    })),
  getMovieById: (id) => {
    const movie = get().movies.find((m) => m.id.toString() === id.toString());
    console.log("Looking for id:", id, "Found:", movie);
    return movie;
  }
}));
