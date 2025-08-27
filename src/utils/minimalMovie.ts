type MinimalMovie = {
  id: number;
  title: string;
  posterUrl: string;
  genres?: string[];
};

export function minimalMovie({
  id,
  title,
  posterUrl,
  genres = ["Drama"],
}: MinimalMovie) {
  return {
    adult: false,
    backdrop_path: "/test-backdrop.jpg",
    belongs_to_collection: null,
    budget: 0,
    genres,
    homepage: "",
    id,
    imdb_id: `tt${id}`,
    origin_country: ["US"],
    original_language: "en",
    original_title: title,
    overview: `${title} test overview`,
    popularity: 1.0,
    poster_path: posterUrl,
    production_companies: [],
    production_countries: [],
    release_date: "2000-01-01",
    revenue: 0,
    runtime: 120,
    spoken_languages: [
      { english_name: "English", iso_639_1: "en", name: "English" },
    ],
    status: "Released",
    tagline: "",
    title,
    video: false,
    vote_average: 8.0,
    vote_count: 100,
    posterUrl,
    rating: 8.0,
  };
}
