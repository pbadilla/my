import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import "@styles/wishList.scss";
import Layout from "@components/layout/Layout";
import Button from "@components/common/Button";
import { MovieCard } from "@components/cards/MovieCard";

import { useWishlist } from "@store/wishList";
import { toast } from "react-toastify";

const WishList: React.FC = () => {
  const navigate = useNavigate();
  const { items, remove } = useWishlist();

  console.log("Wishlist items:", items);

  const moviesByCategory = items.reduce<Record<string, typeof items>>(
    (acc, movie) => {
      const category = movie.category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(movie);
      return acc;
    },
    {}
  );

  const moviesByGenre = items.reduce<Record<string, Movie[]>>((acc, movie) => {
    const genres = movie.genres?.length ? movie.genres : ["Uncategorized"];
    genres.forEach((genre) => {
      if (!acc[genre]) acc[genre] = [];
      acc[genre].push(movie);
    });
    return acc;
  }, {});

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
          {Object.entries(moviesByGenre).length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            Object.entries(moviesByGenre).map(([category, movies]) => (
              <section key={category}>
                <h2 className="wishlist-category">
                  {category} ({movies.length})
                </h2>

                <div className="movies-grid">
                  {movies.map((movie) => (
                    <div key={movie.id} className="movie-card-wrapper group">
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
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WishList;
