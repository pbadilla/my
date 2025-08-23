import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useTheme } from "src/context/ThemeContext";

import Button from "@components/common/Button";
import Logo from "@images/logo.svg";
// import { getWishlist } from "@/lib/wishlist";

import { FaHeart, FaMoon, FaSun } from "react-icons/fa";

import "@styles/header.scss";

export const Header = () => {
  const location = useLocation();
  const [wishlistCount, setWishlistCount] = useState(0);
  const { theme, toggleTheme } = useTheme();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const updateWishlistCount = () => {
      // setWishlistCount(getWishlist().length);
    };

    updateWishlistCount();

    window.addEventListener("storage", updateWishlistCount);
    window.addEventListener("wishlistUpdated", updateWishlistCount);

    return () => {
      window.removeEventListener("storage", updateWishlistCount);
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, [location]);

  return (
    <header className="header">
      <div className="header-container">
        <nav className="navbar">
          <Link to="/" className="brand">
            <img src={Logo} alt="MyTheresa Logo" className="brand-icon" />
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
                icon={<FaHeart size={16} color="white" />}
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
            ></Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
