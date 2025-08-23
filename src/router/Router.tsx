import Home from "@pages/Home";
import Movie from "@pages/Movie";
import ErrorPage from "@pages/Error";

import WishList from "@pages/WishList";

import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/movie/:type/:id",
    element: <Movie />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/wishlist",
    element: <WishList />,
    errorElement: <ErrorPage />,
  },
]) as ReturnType<typeof createBrowserRouter>;
