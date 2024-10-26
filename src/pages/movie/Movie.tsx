import React from "react";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { useFetchData } from "@hooks/useFetch";
import { useParams } from "react-router-dom";

import { addMovieToWishlist } from '@store/wishListSlice';

import Buttonback from "@components/common/buttons/button_back/ButtonBack";
import LazyImage from "@components/image";
import Layout from "@components/layout";

import FavouritesNew from "@components/icons/love";

import "@styles/movie.scss";
import Original from "@components/icons/original";


export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export interface MovieApiResponse {
  results: Movie[];
}

interface MovieType {
  backdrop_path: string;
  original_title: string;
  overview: string;
  popularity: number;
  genres: { name: string }[];
  production_companies: { name: string; origin_country: string }[];
  homepage: string;
}

interface MovieProps {
  idMovie?: string;
  type?: string;
}

const Movie: React.FC<MovieProps> = () => {

  const { id:idMovie, type } = useParams<{ id: string; type: string }>()

  const dispatch = useDispatch();

  // Access the global state for API data
  const url = `https://api.themoviedb.org/3/movie/${idMovie}?api_key=7006edd4690fd5f45e7b5cb6b1561357&language=en-US`;
  const { isLoading, apiData: movies, serverError } = useFetchData<MovieType>(url)


  function addWishList(e: React.MouseEvent, movie: { original_title: string; backdrop_path: string }) {
    e.preventDefault();
    dispatch(addMovieToWishlist(movie));
  }

  return (
    <CSSTransition in={!!movies} timeout={500} classNames="movie-slide" unmountOnExit>
    <>
      {isLoading && <p>Loading...</p>}
      {serverError && <p>Error: {serverError}</p>}
      {movies && (
        <Layout>
          <Buttonback page="home" />
          <div className="movieWrapper">
            <section className="imageMovie">
              <figure className="addWishlist">
                <LazyImage
                  src={`http://image.tmdb.org/t/p/original${movies.backdrop_path}`}
                />
                <figcaption>
                  <h2>Add to my Wishlist</h2>
                  <a
                    href="#"
                    onClick={(e) => addWishList(e, { original_title: movies.original_title, backdrop_path: movies.backdrop_path })}

                  ></a>
                </figcaption>
              </figure>
              <div className="addWishlist-bottom-caption">
                <a href={movies.homepage}>
                  <Original />
                  Movie's original link
                </a>
                <a href="#" onClick={(e) =>addWishList(e,movies)}>
                  <FavouritesNew />
                  Add to my wishlist
                </a>
            </div>
            </section>
            <section className={`descriptionMovie movie-${type}`}>
              <ul>
                <li>
                  <h3>{movies.original_title}</h3>
                </li>
                <li>{movies.overview}</li>
                <li>{movies.popularity}</li>
                <li className="tagsMovie">{movies.genres[0].name}</li>
              </ul>
            </section>
            <section className={`infoMovie movie-${type}`}>
              <ul>
                <li>
                  <span className="infoMovie-title">Production company:</span>
                  <span>{movies.production_companies[0].name}</span>
                </li>
                <li>
                  <span className="infoMovie-title">Country:</span>
                  <span>{movies.production_companies[0].origin_country}</span>
                </li>
              </ul>
            </section>
          </div>
        </Layout>
      )}
    </>
  </CSSTransition>
  );
};

export default Movie;
