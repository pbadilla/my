import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@store/store";
import { removeMovieFromWishlist } from "@store/wishListSlice";

import Buttonback from "@components/common/buttons/button_back/ButtonBack";
import Layout from "../../components/layout";
import Delete from "@components/icons/delete";
import noWishList from "@images/no_movies.jpg";

import "@styles/wishList.scss";

interface Movie {
  backdrop_path: string;
  original_title: string;
  type: string;
}

interface MovieOriginal {
  id: number;
  title: string;
  type: string;
  original_title: string;
  backdrop_path: string;
}

const WishList: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (kindMovie:string, movieId: number) => {
    navigate(`/movie/${kindMovie}/${movieId}`);   
  }
  
  const moviesWishList = useSelector((state: RootState) => state.wishlist.movies);
  const dispatch = useDispatch();

  function deleteFromWishList(e: React.MouseEvent, movie: string) {
    e.preventDefault();
    dispatch(removeMovieFromWishlist(movie));
  }

  return (
    <Layout>
      <Buttonback page="wishlist" />
      {moviesWishList.length > 0 
        ? (
          <ul className="wishListWrapper" data-testid="wishlist" data-app={moviesWishList}>
            {moviesWishList.map((movie, index) => (
              <li key={index} data-id={movie.id}>
                <img
                  src={`http://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
                  alt={`Poster of ${movie.original_title}`}
                  title="Go to movie"
                  onClick={() => handleNavigate(movie.type, movie.id)}
                />
                <div className="content">
                  <span>{movie.original_title}</span>
                  <div
                    className="delete-icon"
                    onClick={(e) => deleteFromWishList(e, movie.original_title)}
                  >
                    <Delete />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-wishlist-wrapper">
            <div className="no-wishlist-container">
              <img src={noWishList} alt="No wishlist" />
              <p className="no-wishlist">No movies in your wishlist yet!</p>
            </div>
          </div>
        )}
    </Layout>
  );
};

export default WishList;
