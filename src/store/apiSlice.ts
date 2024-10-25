import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the initial state of your slice
interface ApiState {
  isLoading: boolean;
  data: any | null;
  error: string | null;
}

const initialState: ApiState = {
  isLoading: false,
  data: null,
  error: null,
};

// Create the slice
const apiSlice = createSlice({
  name: 'apiData',
  initialState,
  reducers: {
    // Action to handle API call start
    fetchApiData: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    // Action to handle success response
    fetchApiSuccess: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
    // Action to handle failure response
    fetchApiFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(`Error: ${action.payload}`);
    },
  },
});

// Export the actions to use them in your hook
export const { fetchApiData, fetchApiSuccess, fetchApiFailure } = apiSlice.actions;

// Export the reducer to include it in the store
export default apiSlice.reducer;
