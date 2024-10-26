import React from "react";
import { Link, useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();

  const handleNavigate = (kindMovie:string, movie: Movie) => {
    navigate(`/movie/${kindMovie}/${movie.id}`);   
  }
  
  return (
    <Link
      to={`/movie/${kindMovie}/${movie.id}`}
      title={movie.original_title}
      data-testid="carousel-item"
      className="carousel-item"
    >
      <div key={movie.id} id={movie.id.toString()}>

      <figure className="carousel-item_details">
        <Image
          src={`http://image.tmdb.org/t/p/w185/${movie.backdrop_path}`}
          alt={movie.title}
          isMovie={true}
        />
        <small className="slide-content">{movie.original_title}</small>
        <figcaption>
          <h2>Go to Movie</h2>
          <a
            href="#"
            onClick={() => handleNavigate(kindMovie, movie)}
          ></a>
        </figcaption>
        </figure>

      </div>
    </Link>
  );
};

export default Card;
