import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './async/headerSlice';

const store = configureStore({
  reducer: {
    header: headerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
