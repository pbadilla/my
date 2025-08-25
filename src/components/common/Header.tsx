import { Link, useLocation } from "react-router-dom";
import { useTheme } from "src/context/ThemeContext";

import Button from "@components/common/Button";
import LogoMytheresa from "@components/icons/logo_mytheresa";

import { FaHeart, FaMoon, FaSun, FaArrowCircleLeft } from "react-icons/fa";
import { useWishlist } from "@store/wishList";

import "@styles/header.scss";

interface HeaderProps {
  hasBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ hasBackButton }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const wishlistCount = useWishlist((state) => state.items.length);

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
                onClick={() => window.history.back()}
              >
                Back to Home
              </Button>
            )}
          </div>

          <div className="nav-links">
            <Link to="/">
              <Button className="nav-button" text="Home" />
            </Link>

            <Link to="/wishlist">
              <Button
                className="nav-button"
                text="Wishlist"
                icon={
                  <FaHeart
                    size={16}
                    color={wishlistCount > 0 ? "red" : "white"}
                  />
                }
              >
                {wishlistCount > 0 && (
                  <span className="wishlist-badge">{wishlistCount}</span>
                )}
              </Button>
            </Link>

            {/* Theme Switch */}
            <Button
              icon={theme === "light" ? <FaMoon /> : <FaSun />}
              onClick={toggleTheme}
              className="theme-toggle"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};
