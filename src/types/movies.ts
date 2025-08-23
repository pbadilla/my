export interface Movie {
  id: string;
  title: string;
  description: string;
  category: 'action' | 'drama' | 'comedy';
  posterUrl: string;
  rating: number;
  year: number;
  duration: number;
}

export interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  category: Movie['category'];
}

export interface MovieApiResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}
export type MovieType = 'popular' | 'top_rated' | 'upcoming';