import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Movie {
  backdrop_path: string;
  id: number;
  original_title: string;
  type: string;
}

export interface WishlistState {
  movies: Movie[];
}

const initialWishlistState: WishlistState = {
  movies: [],
};

const customId = "wishlist-toast";

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: initialWishlistState,
  reducers: {
    addMovieToWishlist: (state, action: PayloadAction<Movie>) => {
      const movieExists = state.movies.some(movie => movie.original_title === action.payload.original_title);

      if (!movieExists) {
        state.movies.push(action.payload);
        toast.success(`${action.payload.original_title} added to wishlist!`, {
          position: "bottom-center",
          toastId: customId,
          transition: Zoom,
          autoClose: 500,
        });
      } else {
        toast.info(`${action.payload.original_title} is already in your wishlist.`);
      }
    },
    removeMovieFromWishlist: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(movie => movie.original_title !== action.payload);
      toast.success(`${action.payload} removed from wishlist.`, {
        position: "bottom-center",
        toastId: customId,
        transition: Zoom,
        autoClose: 500,
      });
    },
  },
});

export const { addMovieToWishlist, removeMovieFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
