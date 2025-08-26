import { RouterProvider } from "react-router-dom";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@store/queryClient";

import { ThemeProvider } from "../src/context/ThemeContext";

// import store, { persistor } from "@store/store";
import { Router } from "./router/Router";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "@styles/index.scss";

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
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
