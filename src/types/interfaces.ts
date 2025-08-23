export interface Movie {
  id: string;
  title: string;
  description: string;
  category: 'action' | 'drama' | 'comedy';
  posterUrl: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  year: number;
  duration: number;
}


export interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  category: Movie['category'];
}