import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import apiReducer from './apiSlice';
import wishlistReducer from './wishListSlice';

import { ApiState } from './apiSlice';
import { WishlistState } from './wishListSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['apiData', 'wishlist'],
};

const rootReducer = combineReducers({
  apiData: apiReducer,
  wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = {
  apiData: ApiState;
  wishlist: WishlistState;
};

export const persistor = persistStore(store);
export default store;
