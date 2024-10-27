import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

import '@styles/app.scss';

import { Home, Movie, Error, WishList } from './pages';
import store, { persistor } from '@store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home  />,
    errorElement: <Error />,
  },
  {
    path: '/movie/:type/:id',
    element: <Movie />,
    errorElement: <Error />,
  },
  {
    path: '/wishlist',
    element: <WishList />,
    errorElement: <Error />,
  }
]);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  )
}

export default App;
