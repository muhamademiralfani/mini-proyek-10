/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ContactState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  message: string | null;
  error: string | null;
}

const initialState: ContactState = {
  status: 'idle',
  message: null,
  error: null,
};

// Async thunk for posting subscription
export const postSubscription = createAsyncThunk<{ message: string }, string, { rejectValue: string }>('contact/postSubscription', async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://furniture-api-lumoshive-academy.vercel.app/api/subscribe', { email });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || 'Failed to subscribe');
  }
});

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSubscription.pending, (state) => {
        state.status = 'loading';
        state.message = null;
        state.error = null;
      })
      .addCase(postSubscription.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(postSubscription.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Unknown error';
        state.message = null;
      });
  },
});

export default contactSlice.reducer;
