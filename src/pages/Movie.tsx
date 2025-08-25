import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovie } from "../services/fetchMovies";
import type { Movie } from "../types/movies";
import Layout from "@components/layout/Layout";
import Button from "@components/common/Button";
import Card from "@components/common/Card";

import { FaStar, FaCalendar, FaClock, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useWishlist } from "@store/wishList";

import { getTmdbImage } from "@utils/tmdb";

import "@styles/movieDetails.scss";

const MoviePage = () => {
  const { id: idMovie } = useParams<{ id: string }>();

  // ✅ Zustand store
  const { add } = useWishlist();
  const inWishlist = useWishlist((state) => state.isInWishlist(idMovie || ""));

  // ✅ Fetch movie from API
  const {
    data: movieData,
    isLoading,
    isError,
    error,
  } = useQuery<Movie>({
    queryKey: ["movie", idMovie],
    queryFn: () => fetchMovie(idMovie!),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(idMovie),
  });

  // ✅ Wishlist handler
  const handleAddToWishlist = () => {
    if (!idMovie || !movieData) return;

    if (inWishlist) {
      toast.info(`${movieData.title} is already in your wishlist.`);
      return;
    }

    add(movieData);
    toast.success(`${movieData.title} has been added to your wishlist!`);
  };

  // ✅ Handle loading / error states
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
