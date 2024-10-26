import React from "react";
import { Link } from "react-router-dom";

import FavouritesNew from "@components/icons/love";
import LogoMytheresa from "@components/icons/logo_mytheresa";

import '@styles/Header.scss';

const Header: React.FC = () => {
  return (
    <header>
      <div className="logo"><LogoMytheresa /></div>

      <div className="favourites-link">
        <Link to="/wishlist" title="Wishlist">
          <FavouritesNew />
        </Link>
      </div>
    </header>
  );
};

export default Header;
