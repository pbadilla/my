import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import Layout from "@components/layout/Layout";
import Button from "@components/common/Button";
import { MovieCard } from "@components/cards/MovieCard";

import { useWishlist } from "@store/wishList";
import { toast } from "react-toastify";

import "@styles/wishList.scss";
import NoPage from "@pages/NoPage";

const WishList: React.FC = () => {
  const navigate = useNavigate();
  const { items, remove } = useWishlist();

  console.log("Wishlist items:", items);

  const uniqueMovies = Array.from(
    new Map(items.map((movie) => [movie.id, movie])).values()
  );

  const handleNavigate = (kindMovie: string, movieId: string) => {
    navigate(`/movie/${kindMovie}/${movieId}`);
  };

  const handleRemoveFromWishlist = (id: string, title: string) => {
    remove(id);
    toast.info(`${title} removed from wishlist`);
  };

  return (
    <Layout hasHeroSection={false} hasBackButton={true}>
      <div className="wishlist">
        <div className="container">
          {uniqueMovies.length === 0 ? (
            <NoPage />
          ) : (
            <div className="movies-grid">
              {uniqueMovies.map((movie) => (
                <div key={movie.id} className="movie-card-wrapper group">
                  <span className="movie-category-label">
                    {movie.category || "Uncategorized"}
                  </span>

                  <MovieCard
                    movie={movie}
                    onClick={() => handleNavigate(movie.category, movie.id)}
                  />

                  <Button
                    icon={<FaTrash className="icon" />}
                    onClick={() =>
                      handleRemoveFromWishlist(movie.id, movie.title)
                    }
                    text="Remove"
                    dataTestId="remove-wishlist-button"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WishList;
