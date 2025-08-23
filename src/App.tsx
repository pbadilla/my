import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@store/queryClient";

import { ThemeProvider } from "../src/context/ThemeContext";

import store, { persistor } from "@store/store";
import { Router } from "./router/Router";

import "@styles/index.scss";

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={Router} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
