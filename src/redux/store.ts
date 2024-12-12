import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './async/headerSlice';
import dataReducer from './async/dataSlice';

const store = configureStore({
  reducer: {
    header: headerReducer,
    data : dataReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
