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

  console.log("Wishlist count:", wishlistCount);

  return (
    <header className="header">
      <div className="header-container">
        <nav className="navbar">
          <Link to="/" className="brand">
            {hasBackButton && (
              <Button icon={<FaArrowCircleLeft className="icon" />}>
                Back to Home
              </Button>
            )}
            <span className="brand-logo">
              <LogoMytheresa />
            </span>
          </Link>

          <div className="nav-links">
            <Link to="/">
              <Button
                variant={location.pathname === "/" ? "default" : "ghost"}
                className="nav-button"
                text="Home"
              />
            </Link>

            <Link to="/wishlist">
              <Button
                variant={
                  location.pathname === "/wishlist" ? "wishlist" : "default"
                }
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
