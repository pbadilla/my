export interface Movie {
  id: string;
  backdrop_path?: string;
  category?: 'action' | 'drama' | 'comedy';
  description: string;
  duration: number;
  genres?: { name: string }[];
  homepage?: string;
  original_title?: string;
  popularity?: number;
  posterUrl: string;
  production_companies?: { name: string; origin_country: string }[];
  rating: number;
  title: string;
  type?: MovieTypes;
  year: number;
}

export interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  category: Movie['category'];
}

export interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}
export type MovieTypes = 'popular' | 'top_rated' | 'upcoming';
