import { Movie } from "../types/movies";

type ApiMovie = {
  id: number | string;
  title?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  release_date?: string;
  runtime?: number;
  genres?: { name: string }[];
  popularity?: number;
  production_companies?: { name: string; origin_country: string }[];
};

export const adaptMovie = (apiMovie: ApiMovie): Movie => {
  return {
    id: String(apiMovie.id),
    title: apiMovie.title || apiMovie.original_title || "Untitled",
    description: apiMovie.overview || "",
    category: undefined, // you can set this if your API provides it
    genres: apiMovie.genres?.map((g) => g.name) ?? [],
    posterUrl: apiMovie.poster_path
      ? `https://image.tmdb.org/t/p/w500${apiMovie.poster_path}`
      : "/placeholder.svg",
    backdrop_path: apiMovie.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${apiMovie.backdrop_path}`
      : null,
    rating: apiMovie.vote_average ?? 0,
    year: apiMovie.release_date
      ? new Date(apiMovie.release_date).getFullYear()
      : 0,
    duration: apiMovie.runtime ?? 0,
    popularity: apiMovie.popularity,
    production_companies: apiMovie.production_companies,
  };
};
