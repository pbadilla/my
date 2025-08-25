export type MovieTypes = "popular" | "top_rated" | "upcoming";

export interface Movie {
  id: string;
  title: string;
  description: string;
  year: number;
  duration: number;
  category?: "action" | "drama" | "comedy";
  type?: MovieTypes;
  posterUrl: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  genres?: string[] | { name: string }[];
  rating?: number;
  vote_average?: number;
  popularity?: number;
  original_title?: string;
  overview?: string;
  runtime?: number;
  release_date?: string;
  homepage?: string;
  production_companies?: { name: string; origin_country: string }[];
}

export interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  category: Movie["category"];
}

export interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}


export interface MovieCardProps {
  movie: Movie;
  type?: string;
  onClick?: () => void;
}
