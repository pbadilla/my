import React from "react";
import { useSelector } from "react-redux";

import Buttonback from "@components/common/buttons/button_back/ButtonBack";
import Layout from "../../components/layout";

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

  console.log("Movies in WishList:", moviesWishList);

  return (
    <Layout>
      <Buttonback page="wishlist" />
      <ul className="wishListWrapper">
        {moviesWishList.length > 0 ? (
          moviesWishList.map((movie, index) => (
            <li key={index}>
              <img
                src={`http://image.tmdb.org/t/p/w92${movie.backdrop_path}`}
                alt={`Poster of ${movie.original_title}`}
              />
              <span>{movie.original_title}</span>
            </li>
          ))
        ) : (
          <p>No movies in your wishlist yet!</p>
        )}
      </ul>
    </Layout>
  );
};

export default WishList;
