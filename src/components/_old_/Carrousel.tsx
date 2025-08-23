import React from "react";

import Slider from 'react-slick';

import { useFetchData } from "@hooks/useFetch";
import { MovieApiResponse, CarrouselProps } from "./enum";

import Card from "@components/cards/cards";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@styles/Carousel.scss';

const Carrousel: React.FC<CarrouselProps> = ({ type }) => {
  const url = `https://api.themoviedb.org/3/movie/${type}?api_key=7006edd4690fd5f45e7b5cb6b1561357&language=en-US`;
  const { isLoading, apiData: movies, serverError } = useFetchData<MovieApiResponse>(url);

  const settings = {
    dots: true,
    infinite: true,
    focusOnSelect: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-container" data-testid="carousel">
      {isLoading && <p>Loading...</p>}
      {serverError && <p>Error: {serverError}</p>}
      {movies && (
        <div className={`carousel-${type}`} data-type={type}>
          <h2>{type}</h2>
          <Slider {...settings}>
            {movies.results.map((movie: any) => (
              <Card kindMovie={type} movie={movie} key={movie.id} />
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Carrousel;
