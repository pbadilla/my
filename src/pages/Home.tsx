import React from "react";

import Layout from "@components/layout/Layout";

import MovieCarousel from "@components/carousel/MovieCarrousel";

const Home: React.FC = () => {
  return (
    <Layout hasHeroSection={true} hasCarrousels={true}>
      <MovieCarousel type="top_rated" title="Top Rated Movies" />
      <MovieCarousel type="popular" title="Popular Movies" />
      <MovieCarousel type="upcoming" title="Upcoming Movies" />
    </Layout>
  );
};

export default Home;
