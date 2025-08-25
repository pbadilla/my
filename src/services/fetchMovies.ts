import axios from "axios";
import type { Movie, MoviesResponse } from "../types/movies";
import { adaptMovie } from "@utils/adapterMovies";
import { useMoviesStore } from "@store/moviesStore";

const API_KEY = '7006edd4690fd5f45e7b5cb6b1561357';

export const fetchMovies = async (type: string): Promise<MoviesResponse> => {
  const url = `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&language=en-US`;
  const { data } = await axios.get<MoviesResponse>(url);

  const addMovies = useMoviesStore.getState().addMovies;
  const existingIds = useMoviesStore.getState().movies.map((m) => m.id);

  const newMovies = data.results
    .map(adaptMovie)
    .filter((m) => !existingIds.includes(m.id));

  if (newMovies.length > 0) addMovies(newMovies);

  return { ...data, results: newMovies };
};

export const fetchMovie = async (id: string): Promise<Movie> => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
  const { data } = await axios.get(url);

  return adaptMovie(data);
};
