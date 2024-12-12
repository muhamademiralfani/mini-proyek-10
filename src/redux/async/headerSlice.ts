import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface HeaderState {
  title: string;
  description: string;
  banner: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: HeaderState = {
  title: '',
  description: '',
  banner: '',
  status: 'idle',
  error: null,
};

// Async thunk for fetching header data
export const fetchHeader = createAsyncThunk('header/fetchHeader', async () => {
  const response = await axios.get('https://furniture-api-lumoshive-academy.vercel.app/api/header');
  return response.data;
});

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeader.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHeader.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.title = action.payload.title;
        state.description = action.payload.description;
        state.banner = action.payload.banner;
      })
      .addCase(fetchHeader.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default headerSlice.reducer;
