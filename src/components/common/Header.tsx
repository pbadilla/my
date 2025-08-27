import { FaHeart, FaMoon, FaSun, FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useTheme } from "src/context/ThemeContext";

import { useWishlist } from "@store/wishList";

import { useCurrentPage } from "@hooks/useCurrentPage";

import Button from "@components/common/Button";
import LogoMytheresa from "@components/icons/logo_mytheresa";
import { LanguageSelector } from "@components/flags/LanguageSelector";

import "@styles/header.scss";

interface HeaderProps {
  hasBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ hasBackButton }) => {
  const { theme, toggleTheme } = useTheme();

  const wishlistCount = useWishlist((state) => state.items.length);

  const { path, title } = useCurrentPage();

  return (
    <header className="header">
      <div className="header-container">
        <nav className="navbar">
          <div className="brand-wrapper">
            <Link to="/" className="brand-link">
              <span className="brand-logo">
                <LogoMytheresa />
              </span>
            </Link>

            {hasBackButton && (
              <Button
                icon={<FaArrowCircleLeft className="icon" />}
                className="brand-back-button"
                onClick={() => (window.location.href = "/")}
                dataTestId="back-button"
              >
                Back to Home
              </Button>
            )}
          </div>

          <div className="nav-links">
            <Link to="/">
              <Button
                className="nav-button"
                text="Home"
                dataTestId="home-button"
              />
            </Link>

            <Link to="/movies">
              <Button
                className="nav-button"
                text="Movies"
                dataTestId="movies-button"
              />
            </Link>

            <Link to="/wishlist">
              <Button
                className="nav-button"
                dataTestId="wishlist-button-header"
                text={`Wishlist ${
                  wishlistCount > 0 ? `(${wishlistCount})` : ""
                }`}
                icon={
                  <FaHeart
                    size={16}
                    className={
                      wishlistCount > 0
                        ? "wishlist-icon--active"
                        : "wishlist-icon"
                    }
                  />
                }
              />
            </Link>

            <LanguageSelector />

            <Button
              icon={theme === "light" ? <FaMoon /> : <FaSun />}
              onClick={toggleTheme}
              className="theme-toggle"
              dataTestId="theme-toggle-button"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};
