import axios from 'axios';
import type { MovieApiResponse } from '../types/movies';

export const fetchMovies = async (type: string): Promise<MovieApiResponse> => {
  const url = `https://api.themoviedb.org/3/movie/${type}?api_key=7006edd4690fd5f45e7b5cb6b1561357&language=en-US`;
  const { data } = await axios.get<MovieApiResponse>(url);
  return data;
};
