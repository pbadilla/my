import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface ApiState { 
  isLoading: boolean;
  data: any | null;
  error: string | null;
}

const initialState: ApiState = {
  isLoading: false,
  data: null,
  error: null,
};

const apiSlice = createSlice({
  name: 'apiData',
  initialState,
  reducers: {
    fetchApiData: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchApiSuccess: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchApiFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(`Error: ${action.payload}`);
    },
  },
});

export const { fetchApiData, fetchApiSuccess, fetchApiFailure } = apiSlice.actions;

export default apiSlice.reducer;
