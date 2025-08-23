import { useRef } from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@utils/fetchMovies";
import type { MovieApiResponse } from "../../types/movies";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { MovieCard } from "@components/cards/MovieCard";

import "@styles/movieCarrousel.scss";
import { getCategoryClass } from "@utils/getCategories";

interface MovieCarousel {
  type: string;
  title: string;
}

export const MovieCarousel = ({ type, title }: MovieCarousel) => {
  const {
    data: moviesResponse,
    isLoading,
    error,
  } = useQuery<MovieApiResponse>({
    queryKey: ["movies", type],
    queryFn: () => fetchMovies(type),
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Width of card + gap
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies</p>;

  return (
    <section className="section-movies">
      <div className="section-header">
        <h2
          className={`section-title ${getCategoryClass(
            type,
            "section-title"
          )} `}
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
