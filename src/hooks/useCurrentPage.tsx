import { useLocation, matchPath } from "react-router-dom";
import { useEffect } from "react";

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/wishlist": "Wishlist",
  "/movie/:id": "Movie Details",
};

export function useCurrentPage() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let title = "Unknown Page";
    for (const route in pageTitles) {
      if (matchPath({ path: route, end: true }, path)) {
        title = pageTitles[route];
        break;
      }
    }

    localStorage.setItem("current-page", path);
    localStorage.setItem("current-page-title", title);
  }, [location]);

  return {
    path: location.pathname,
    title: localStorage.getItem("current-page-title") || "",
  };
}
