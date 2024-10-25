import React from "react";
import { Link } from "react-router-dom";

import Favourites from "@components/icons/favourites";

import '@styles/Header.scss';

const Header: React.FC = () => {
  return (
    <header>
      <div>Movie Slider - MyTheresa</div>

      <div className="favourites-link">
        <Link to="/wishlist">
          <Favourites />
          <span>Your wishlist!</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
