import axios from 'axios';

import type { Movie, MoviesResponse } from '../types/movies';

import { useMoviesStore } from "@store/moviesStore";

export const fetchMovies = async (type: string): Promise<MoviesResponse> => {
  const url = `https://api.themoviedb.org/3/movie/${type}?api_key=7006edd4690fd5f45e7b5cb6b1561357&language=en-US`;
  const { data } = await axios.get<MoviesResponse>(url);

  const addMovies = useMoviesStore.getState().addMovies;
  const existingIds = useMoviesStore.getState().movies.map((m) => m.id);
  const newMovies = data.results.filter((m) => !existingIds.includes(m.id));
  if (newMovies.length > 0) addMovies(newMovies);

  return data;
};

export const fetchMovie = async (id: string): Promise<Movie> => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=7006edd4690fd5f45e7b5cb6b1561357&language=en-US`;
  const { data } = await axios.get(url);

  // Transform TMDB response into your Movie interface
  const movie: Movie = {
    id: data.id.toString(),
    title: data.title,
    original_title: data.original_title,
    description: data.overview,
    backdrop_path: data.backdrop_path,
    posterUrl: data.poster_path,
    duration: data.runtime,
    genres: data.genres?.map((g: any) => ({ name: g.name })),
    production_companies: data.production_companies?.map((c: any) => ({
      name: c.name,
      origin_country: c.origin_country,
    })),
    homepage: data.homepage,
    popularity: data.popularity,
    rating: data.vote_average,
    year: parseInt(data.release_date?.split("-")[0] || "0", 10),
  };

  return movie;
};