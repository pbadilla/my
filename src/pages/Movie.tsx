import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaStar, FaCalendar, FaClock, FaHeart } from "react-icons/fa";

import { fetchMovie } from "../services/fetchMovies";
import type { Movie } from "../types/movies";

import { useWishlist } from "@store/wishList";

import { getTmdbImage } from "@utils/tmdb";

import Layout from "@components/layout/Layout";
import Button from "@components/common/Button";
import Card from "@components/common/Card";

import "@styles/movieDetails.scss";
import Loading from "@pages/Loading";
import NotFound from "@pages/NotFound";
import ErrorPage from "@pages/Error";

const MoviePage = () => {
  const { id: idMovie } = useParams<{ id: string }>();

  const { add } = useWishlist();
  const inWishlist = useWishlist((state) => state.isInWishlist(idMovie || ""));

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

    if (inWishlist) {
      toast.info(`${movieData.title} is already in your wishlist.`);
      return;
    }

    add(movieData);
    toast.success(`${movieData.title} has been added to your wishlist!`);
  };

  if (!idMovie) return <ErrorPage message="No movie ID provided" />;
  if (isError) return <ErrorPage message={(error as Error).message} />;

  if (!movieData) return <NotFound />;

  if (isLoading) return <Loading />;

  console.log("movieData:", movieData);

  return (
    <Layout hasHeroSection={false} hasBackButton={true}>
      <div className="movie-details">
        <div className="container">
          <div className="grid">
            <div className="poster">
              <Card>
                <img
                  src={getTmdbImage(movieData.posterUrl) || "/placeholder.svg"}
                  alt={movieData.title}
                />
              </Card>
            </div>

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
                    <span>{movieData.release_date}</span>
                  </div>
                  <div className="meta-item">
                    <FaClock className="icon" />
                    <span>{movieData.runtime} min</span>
                  </div>
                </div>
              </div>

              <div className="description">
                <h2 className="title">Description</h2>
                <p>{movieData.overview}</p>
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
