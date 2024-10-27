import React from "react";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { useFetchData } from "@hooks/useFetch";
import { useParams } from "react-router-dom";

import { addMovieToWishlist } from '@store/wishListSlice';

import Buttonback from "@components/common/buttons/button_back/ButtonBack";
import Footer from "@components/common/footer";
import Header from "@components/common/header";
import Original from "@components/icons/original";

import LazyImage from "@components/image";
import FavouritesNew from "@components/icons/love";

import "@styles/movie.scss";
import Button from "@components/common/buttons/button";


export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export interface MovieApiResponse {
  results: Movie[];
}

interface MovieType {
  id: number;
  type: string;
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


  function addWishList(
    e: React.MouseEvent, 
    movie: { 
      original_title: string; 
      backdrop_path: string, 
      id: number, 
      type: string 
    }) {
    e.preventDefault();
    dispatch(addMovieToWishlist(movie));
  }

  return (
    <div className="layout" data-testid="movie">
      <div className="header">
        <Header />
        <Buttonback page="home" />
      </div>
      <div className="body body-movie" data-testid="movie-body">
        <div className="content">
            {isLoading && <p>Loading...</p>}
            {serverError && <p>Error: {serverError}</p>}
            {movies && (
                <>
                <div className="container" data-testid="movies-container">
                  <section className="container-column__left">
                    <figure>
                      <LazyImage
                        src={`http://image.tmdb.org/t/p/original${movies.backdrop_path}`}
                      />
                      <figcaption>
                        <h2>Add to my Wishlist</h2>
                        <a href="#" title="Add to whistList"
                          onClick={(e) => 
                            addWishList(e, 
                            { 
                                original_title: movies.original_title, 
                                backdrop_path: movies.backdrop_path, 
                                id: movies.id,
                                type: type
                            })}
                        ></a>
                      </figcaption>
                    </figure>
                  </section>
                  <section className={`container-column__right movie movie-${type}`}>
                    <ul className="movie-description">
                      <li data-testid="movie-title"><h3>{movies.original_title}</h3></li>
                      <li data-testid="movie-overview" className="movie-description__overview">{movies.overview}</li>
                      <li data-testid="movie-popularity" className="movie-description__popularity">{movies.popularity}</li>
                      <li data-testid="movie-genre" className="movie-description__tagsMovie">{movies.genres[0].name}</li>
                    </ul>
                    <div className="movie-description__actions" data-testid="movie-actions">
                        <Button
                          id="movie-button-wishlist"
                          className={`movie-button__${type}`}
                          text="Go to movie's homepage" 
                          icon={<Original />} 
                          onClick={() => window.open(movies.homepage, "_blank")}
                        />
                        <Button
                          id="movie-button-go-to-homepage"
                          className={`movie-button__${type}`}
                          text="Add to whistList" 
                          icon={<FavouritesNew />} 
                          onClick={(e) => 
                            addWishList(e, 
                            { 
                                  original_title: movies.original_title,  
                                  backdrop_path: movies.backdrop_path, 
                                  id: movies.id,
                                  type: type
                              })}
                        />
                    </div>
                  </section>
                  <section className={`container-column__footer movie movie-${type}`} data-testid="movie-footer">
                    <ul>
                      <li>
                        <h4>Production company:</h4>
                        <span>{movies.production_companies[0].name}</span>
                      </li>
                      <li>
                        <h4>Country:</h4>
                        <span>{movies.production_companies[0].origin_country}</span>
                      </li>
                    </ul>
                  </section>
                </div>
              </>
            )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Movie;
