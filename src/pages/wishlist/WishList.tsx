import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeMovieFromWishlist } from "@store/wishListSlice";

import Buttonback from "@components/common/buttons/button_back/ButtonBack";
import Layout from "../../components/layout";
import Delete from "@components/icons/delete";

import noWishList from "@images/no_movies.jpg";

import "@styles/wishList.scss";

interface Movie {
  backdrop_path: string;
  original_title: string;
}

interface RootState {
  wishlist: {
    movies: Movie[];
  };
}

const WishList: React.FC = () => {
  const moviesWishList = useSelector((state: RootState) => state.wishlist.movies);

  const dispatch = useDispatch();

  function deleteFromWishList(e: React.MouseEvent, movie: string) {
    e.preventDefault();
    console.log("Movie deleted:", movie);
    dispatch(removeMovieFromWishlist(movie));
  }
  

  return (
    <Layout>
      <Buttonback page="wishlist" />
      {moviesWishList.length > 0 
      ? (
      <ul className="wishListWrapper">
          {moviesWishList.map((movie, index) => (
            <li key={index}>
              <img
                src={`http://image.tmdb.org/t/p/w780/${movie.backdrop_path}`} // Change size as needed
                alt={`Poster of ${movie.original_title}`}
              />
              <div className="content">
                <span>{movie.original_title}</span>
                <div className="delete-icon" onClick={(e) => deleteFromWishList(e, movie.original_title)}>                
                  <Delete />            
                </div>
              </div>
            </li>
          ))}
      </ul>)
      : (
        <div className="no-wishlist-wrapper">
          <div className="no-wishlist-container">
            <img src={noWishList} alt="No wishlist"/>
            <p className="no-wishlist">No movies in your wishlist yet!</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default WishList;
