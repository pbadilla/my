import { Link } from "react-router-dom";
import { Star } from "lucide-react";

import type { MovieCardProps } from "../../types/movies";

import Card from "@components/common/Card";

import { getTmdbImage } from "@utils/tmdb";
import { getRatingClass } from "@utils/getRatingColors";

import "../../styles/movieCard.scss";
import { getCategoryClass } from "@utils/getCategories";

export const MovieCard = ({ movie, type }: MovieCardProps) => {
  console.log("Rendering MovieCard for movie:", movie);

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
          <div className={`movie-card__rating ${getRatingClass(movie.rating)}`}>
            <Star className="icon-star" />
            <span>{movie.rating.toFixed(1)}</span>
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
