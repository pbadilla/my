import React from "react";

import Layout from "@components/layout/Layout";

import Loading from "@components/loading";

const Home: React.FC = () => {
  return (
    <Layout hasHeroSection={false}>
      <div className="movie-sections">
        <Loading />
      </div>
    </Layout>
  );
};

export default Home;
