import { configureStore } from '@reduxjs/toolkit';

import apiReducer from './apiSlice';
import wishlistReducer from './wishListSlice';

import { ApiState } from './apiSlice';
import { WishlistState } from './wishListSlice';

const store = configureStore({
  reducer: {
    apiData: apiReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = {
  apiData: ApiState;
  wishlist: WishlistState;
};

export default store;
