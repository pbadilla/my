export const getTmdbImage = (path: string | null, size: "w185" | "w342" | "w500" = "w500") => {
  if (!path) return "/placeholder.svg"; // fallback
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
