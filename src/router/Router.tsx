import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "@pages/Error";
import Home from "@pages/Home";
import Movie from "@pages/Movie";
import WishList from "@pages/WishList";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/movie/:id",
    element: <Movie />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/wishlist",
    element: <WishList />,
    errorElement: <ErrorPage />,
  },
]) as ReturnType<typeof createBrowserRouter>;
