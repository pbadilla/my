import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovie } from "@utils/fetchMovies";
import type { Movie } from "../types/movies";
import Layout from "@components/layout/Layout";
import Button from "@components/common/Button";
import Card from "@components/common/Card";

import { FaStar, FaCalendar, FaClock, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { addToWishlist, isInWishlist } from "@utils/wishList";

import "@styles/movieDetails.scss";
import { getTmdbImage } from "@utils/tmdb";

const MoviePage = () => {
  const { id: idMovie } = useParams<{ id: string }>();

  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    if (idMovie) {
      setInWishlist(isInWishlist(idMovie));
    }
  }, [idMovie]);

  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery<Movie>({
    queryKey: ["movie", idMovie],
    queryFn: () => fetchMovie(idMovie!),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(idMovie),
  });

  // ✅ hook stays at top level, updates local state
  useEffect(() => {
    if (movie) {
      setMovieData(movie);
    }
    console.log("movie", movie);
  }, [movie]);

  const handleAddToWishlist = () => {
    if (!idMovie || !movieData) return;

    const success = addToWishlist(movieData);

    if (success) {
      setInWishlist(true);
      window.dispatchEvent(new Event("wishlistUpdated"));
      toast.success(`${movieData.title} has been added to your wishlist!`);
    } else {
      toast.info(`${movieData.title} is already in your wishlist.`);
    }
  };

  // ✅ handle loading / error states after hooks
  if (!idMovie) return <p>No movie ID provided</p>;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{(error as Error).message}</p>;
  if (!movieData) return <p>Movie not found</p>;

  return (
    <Layout hasHeroSection={false} hasBackButton={true}>
      <div className="movie-details">
        <div className="container">
          <div className="grid">
            {/* Poster */}
            <div className="poster">
              <Card>
                <img
                  src={getTmdbImage(movieData.posterUrl) || "/placeholder.svg"}
                  alt={movieData.title}
                />
              </Card>
            </div>

            {/* Details */}
            <div className="details">
              <div>
                <div className="category">{movieData.category}</div>
                <h1 className="title">{movieData.title}</h1>

                <div className="meta">
                  <div className="meta-item">
                    <FaStar className="icon fill-primary" />
                    <span>{movieData.rating}</span>
                  </div>
                  <div className="meta-item">
                    <FaCalendar className="icon" />
                    <span>{movieData.year}</span>
                  </div>
                  <div className="meta-item">
                    <FaClock className="icon" />
                    <span>{movieData.duration} min</span>
                  </div>
                </div>
              </div>

              <div className="description">
                <h2 className="title">Description</h2>
                <p>{movieData.description}</p>
              </div>

              <div className="wishlist-button">
                <Button
                  onClick={handleAddToWishlist}
                  disabled={inWishlist}
                  icon={<FaHeart />}
                  text={inWishlist ? "Added to Wishlist" : "Add to Wishlist"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MoviePage;
