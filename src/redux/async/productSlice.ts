/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;

// Define types for the product and API response
interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  price_after_discount: number | null;
}

interface ProductState {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface FetchProductsParams {
  page?: number;
  limit?: number;
}

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ page = 1, limit = 8 }: FetchProductsParams, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Initial state
const initialState: ProductState = {
  page: 1,
  limit: 8,
  totalItems: 0,
  totalPages: 0,
  products: [],
  status: 'idle',
  error: null,
};

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Actions
export const { setPage } = productSlice.actions;

// Reducer
export default productSlice.reducer;
