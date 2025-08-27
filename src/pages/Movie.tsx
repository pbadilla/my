import { FaStar, FaCalendar, FaClock, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useWishlist } from "@store/wishList";

import ErrorPage from "@pages/Error";
import Loading from "@pages/Loading";
import NotFound from "@pages/NotFound";

import Button from "@components/common/Button";
import Card from "@components/common/Card";
import Layout from "@components/layout/Layout";

import "@styles/movieDetails.scss";

import type { Movie } from "../types/movies";
import { fetchMovie } from "../services/fetchMovies";
import { getTmdbImage } from "@utils/tmdb";

const MoviePage = () => {
  const { id: idMovie } = useParams<{ id: string }>();

  const { add, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(idMovie || "");

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

  const handleAddToWishlist = () => {
    if (!idMovie || !movieData) return;

    if (isInWishlist(idMovie)) {
      toast.info(`${movieData.title} is already in your wishlist!`);
      return;
    }

    add(movieData);
    toast.success(`${movieData.title} has been added to your wishlist!`);
  };

  if (!idMovie) return <ErrorPage message="No movie ID provided" />;
  if (isError) return <ErrorPage message={(error as Error).message} />;
  if (isLoading) return <Loading />;
  if (!movieData) return <NotFound />;

  return (
    <Layout hasHeroSection={false} hasBackButton={true}>
      <div className="movie-details" data-testid="movie-page">
        <div className="container">
          <div className="grid">
            {}
            <div className="poster" data-testid="movie-poster">
              <Card>
                <img
                  src={getTmdbImage(movieData.posterUrl) || "/placeholder.svg"}
                  alt={movieData.title}
                />
              </Card>
            </div>

            {}
            <div className="details" data-testid="movie-details">
              <div>
                <div className="category" data-testid="movie-category">
                  {movieData.category}
                </div>
                <h1 className="title" data-testid="movie-title">
                  {movieData.title}
                </h1>

                <div className="meta" data-testid="movie-meta">
                  <div className="meta-item" data-testid="movie-rating">
                    <FaStar className="icon fill-primary" />
                    <span>{movieData.rating}</span>
                  </div>
                  <div className="meta-item" data-testid="movie-release-date">
                    <FaCalendar className="icon" />
                    <span>{movieData.release_date}</span>
                  </div>
                  <div className="meta-item" data-testid="movie-runtime">
                    <FaClock className="icon" />
                    <span>{movieData.runtime} min</span>
                  </div>
                </div>
              </div>

              {}
              <div className="description" data-testid="movie-description">
                <h2 className="title">Description</h2>
                <p>{movieData.overview}</p>
              </div>

              {}
              <div className="wishlist-button">
                <Button
                  dataTestId="wishlist-button"
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
