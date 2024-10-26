export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export interface MovieApiResponse {
  results: Movie[];
}

export interface MyType {
  id: number;
  name: string;
}