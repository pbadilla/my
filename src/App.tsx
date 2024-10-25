import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";

import '@styles/app.scss'

import { Home, Movie, Error, WishList } from './pages';
import store from '@store/store';

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

const history = createBrowserHistory();

const App = () => {
  return(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
