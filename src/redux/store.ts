import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './async/headerSlice';
import dataReducer from './async/dataSlice';
import categoryReducer from './async/categorySlice';
import productReducer from './async/productSlice';
import testimonialReducer from './async/testimonialSlice';

const store = configureStore({
  reducer: {
    header: headerReducer,
    data: dataReducer,
    category: categoryReducer,
    products: productReducer,
    testimonials: testimonialReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
