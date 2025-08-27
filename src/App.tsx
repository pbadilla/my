import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { queryClient } from "@store/queryClient";
import { useWishlist } from "@store/wishList";

import "@styles/index.scss";

import { Router } from "./router/Router";
import { ThemeProvider } from "../src/context/ThemeContext";

if (typeof window !== "undefined") {
  (window as any).__setWishlistForTests = (movies: any[]) => {
    useWishlist.setState({ items: movies });
  };
}













const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router} />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
