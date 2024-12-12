import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Testimonial {
  id: number;
  name: string;
  message: string;
  title: string;
  image: string;
}

interface TestimonialState {
  testimonials: Testimonial[];
  page: number;
  totalPages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TestimonialState = {
  testimonials: [],
  page: 1,
  totalPages: 1,
  status: 'idle',
  error: null,
};

// Thunk for fetching testimonials
export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchTestimonials',
  async ({ page }: { page: number }) => {
    const response = await axios.get(
      `https://furniture-api-lumoshive-academy.vercel.app/api/testimonials?page=${page}&limit=1`
    );
    return response.data;
  }
);

const testimonialSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.testimonials = action.payload.testimonials;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch testimonials';
      });
  },
});

export const { setPage } = testimonialSlice.actions;

export default testimonialSlice.reducer;
