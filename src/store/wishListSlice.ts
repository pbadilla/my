import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface WishlistState {
  movies: string[];
}

const initialWishlistState: WishlistState = {
  movies: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: initialWishlistState,
  reducers: {
    addMovieToWishlist: (state, action: PayloadAction<string>) => {
      if (!state.movies.includes(action.payload)) {
        state.movies.push(action.payload);
        toast.success(`${action.payload} added to wishlist!`);
      } else {
        toast.info(`${action.payload} is already in your wishlist.`);
      }
    },
    removeMovieFromWishlist: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(movie => movie !== action.payload);
      toast.success(`${action.payload} removed from wishlist.`);
    },
  },
});

export const { addMovieToWishlist, removeMovieFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
