import React from "react";

import Layout from "@components/layout/Layout";

import MovieCarousel from "@components/carousel/Carrousel";

const Home: React.FC = () => {
  return (
    <Layout hasHeroSection={true}>
      <div className="movie-sections">
        <MovieCarousel type="top_rated" title="Top Rated Movies" />
        <MovieCarousel type="popular" title="Popular Movies" />
        <MovieCarousel type="upcoming" title="Upcoming Movies" />
      </div>
    </Layout>
  );
};

export default Home;
