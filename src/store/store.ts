import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './apiSlice';
import wishlistReducer from './wishListSlice';

const store = configureStore({
  reducer: {
    apiData: apiReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
