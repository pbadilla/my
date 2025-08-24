import type { Movie } from "../types/movies";

const WISHLIST_KEY = 'wishlist';

export const getWishlist = (): Movie[] => {
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading wishlist:', error);
    return [];
  }
};

export const addToWishlist = (movie: Movie): boolean => {
  try {
    const wishlist = getWishlist();
    const exists = wishlist.some(item => item.id === movie.id);
    
    if (!exists) {
      const updatedWishlist = [...wishlist, movie];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return false;
  }
};

export const removeFromWishlist = (movieId: string): void => {
  try {
    const wishlist = getWishlist();
    const updatedWishlist = wishlist.filter(movie => movie.id !== movieId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
  } catch (error) {
    console.error('Error removing from wishlist:', error);
  }
};

export const isInWishlist = (movieId: string): boolean => {
  const wishlist = getWishlist();
  return wishlist.some(movie => movie.id === movieId);
};