import { useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../services/fetchMovies";
import type { MoviesResponse } from "../../types/movies";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard } from "@components/cards/MovieCard";
import { getCategoryClass } from "@utils/getCategories";
import { useMoviesStore } from "@store/moviesStore";
import "@styles/movieCarrousel.scss";
import { toast } from "react-toastify";

interface MovieCarouselProps {
  type: string;
  title: string;
}

export const MovieCarousel = ({ type, title }: MovieCarouselProps) => {
  const addMovies = useMoviesStore((s) => s.addMovies);
  const cachedMovies = useMoviesStore((s) => s.movies);

  const {
    data: moviesResponse,
    isLoading,
    isError,
    error,
  } = useQuery<MoviesResponse>({
    queryKey: ["movies", type],
    queryFn: () => fetchMovies(type),
    placeholderData: {
      results: cachedMovies,
      page: 1,
      total_pages: 1,
      total_results: cachedMovies.length,
    },
    staleTime: 1000 * 60 * 5,
  });

  if (error) {
    if (error instanceof Error) {
      toast.error("Error fetching movies: " + error.message);
    } else {
      toast.error("Error fetching movies: " + error);
    }
  }

  useEffect(() => {
    if (!moviesResponse) return;

    const existingIds = cachedMovies.map((m) => m.id);
    const newMovies = moviesResponse.results.filter(
      (m) => !existingIds.includes(m.id)
    );

    if (newMovies.length > 0) {
      addMovies(newMovies);
    }

    console.log("Movies in carousel:", moviesResponse.results);
    console.log("Cached movies:", cachedMovies);
  }, [moviesResponse, cachedMovies, addMovies]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 320; // card width + gap
    const newScrollLeft =
      scrollContainerRef.current.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading movies</p>;

  return (
    <section className="section-movies">
      <div className="section-header">
        <h2
          className={`section-title ${getCategoryClass(type, "section-title")}`}
        >
          {title}
        </h2>

        <div className="scroll-controls">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="scroll-button"
          >
            <ChevronLeft />
            <span className="sr-only">Scroll left</span>
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="scroll-button"
          >
            <ChevronRight />
            <span className="sr-only">Scroll right</span>
          </button>
        </div>
      </div>

      <div ref={scrollContainerRef} className="movies-scroll">
        {moviesResponse?.results?.map((movie) => (
          <div key={movie.id} className="movie-card-wrapper">
            <MovieCard movie={movie} type={type} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieCarousel;
