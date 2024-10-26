import { StaticRouter } from 'react-router-dom/server';
import { Provider } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import store from '@store/store';

import { Home, Movie, Error, WishList } from './pages';

interface AppServerProps {
  url: string;
}

const AppServer: React.FC<AppServerProps> = ({ url }) => {
  return (
    <StaticRouter location={url}>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:type/:id" element={<Movie />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Provider>
    </StaticRouter>
  );
};

export default AppServer;
