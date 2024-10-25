import React from "react";
import { Link } from "react-router-dom";
import Image from "@components/image";

interface Movie {
  id: number;
  title: string;
  original_title: string;
  backdrop_path: string;
}

interface CardProps {
  kindMovie: string;
  movie: Movie;
}

const Card: React.FC<CardProps> = ({ kindMovie, movie }) => {
  return (
    <Link
      to={`/movie/${kindMovie}/${movie.id}`}
      title={movie.original_title}
      data-testid="carousel-item"
      className="carousel-item"
    >
      <div key={movie.id} id={movie.id.toString()}>
        <Image
          src={`http://image.tmdb.org/t/p/w185/${movie.backdrop_path}`}
          alt={movie.title}
        />
        <small className="slide-content">{movie.original_title}</small>
      </div>
    </Link>
  );
};

export default Card;
