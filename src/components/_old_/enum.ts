export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export interface MoviesResponse {
  results: Movie[];
}


export interface CarrouselProps {
  type: string;
}