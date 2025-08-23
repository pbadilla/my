import React from "react";

import "@styles/hero.scss";

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <h1 className="hero-title">Welcome to myTheresa</h1>
      <p className="hero-subtitle">
        Discover amazing films across different genres and build your perfect
        watchlist.
      </p>
    </section>
  );
};

export default Hero;
