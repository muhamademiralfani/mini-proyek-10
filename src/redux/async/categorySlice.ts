/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Category {
  title: string;
  image: string;
}

export interface CategoryState {
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

 const initialState: CategoryState = {
  categories: [],
  status: 'idle',
  error: null,
};

// Transform function for API response
export const transformCategoryData = (data: any[]): Category[] => {
  return data.map((item) => ({
    title: item.title,
    image: item.image,
  }));
};

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk('category/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://furniture-api-lumoshive-academy.vercel.app/api/category');
    return transformCategoryData(response.data.category);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch categories');
  }
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
