import React from "react";
import { Link } from "react-router-dom";

import FavouritesNew from "@components/icons/love";
import LogoMytheresa from "@components/icons/logo_mytheresa";

import "@styles/header.scss";

const Header: React.FC = () => {
  return (
    <header data-tesid="header">
      <div className="logo">
        <Link
          to="https://www.mytheresa.com"
          title="myTheresa website"
          target="_blank"
        >
          <span>
            <LogoMytheresa />
          </span>
        </Link>
      </div>

      <div className="favourites-link">
        <Link to="/wishlist" title="Wishlist">
          <FavouritesNew />
        </Link>
      </div>
    </header>
  );
};

export default Header;
