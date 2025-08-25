import { Movie } from "@types/movies";

export const adaptMovie = (apiMovie: Movie): Movie => ({
  ...apiMovie,
  posterUrl: apiMovie.posterUrl ?? 
              (apiMovie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${apiMovie.poster_path}` 
                : ""),
  rating: apiMovie.rating ?? apiMovie.vote_average ?? 0,
  genres: Array.isArray(apiMovie.genres)
    ? (typeof apiMovie.genres[0] === "string"
        ? (apiMovie.genres as string[])
        : (apiMovie.genres as { name: string }[]).map((g) => g.name))
    : [],
});
