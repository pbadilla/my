import { Link } from "react-router-dom";
import { Star } from "lucide-react";

import type { Movie } from "../../types/interfaces";

import Card from "@components/common/Card";

import { getTmdbImage } from "@utils/tmdb";
import { getRatingClass } from "@utils/getRatingColors";

import "../../styles/movieCard.scss";
import { getCategoryClass } from "@utils/getCategories";

interface MovieCardProps {
  movie: Movie;
  type: string;
}

export const MovieCard = ({ movie, type }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <Card className={`movie-card ${getCategoryClass(type, "movie-card")}`}>
        <div className="movie-card__poster">
          <img
            src={getTmdbImage(movie.backdrop_path || movie.poster_path)}
            alt={movie.title}
            loading="lazy"
          />
          <div className="movie-card__overlay" />

          {/* Rating badge */}
          <div
            className={`movie-card__rating ${getRatingClass(
              movie.vote_average
            )}`}
          >
            <Star className="icon-star" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>

        <div className="movie-card__content">
          <h3
            className={`movie-card__title ${getCategoryClass(
              type,
              "movie-card__title"
            )}`}
          >
            {movie.title}
          </h3>
          <div className="movie-card__meta">
            <span className="movie-card__category">{movie.category}</span>
            <span className="movie-card__year">{movie.year}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
