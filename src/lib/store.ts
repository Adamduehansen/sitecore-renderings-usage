import { configureStore } from '@reduxjs/toolkit';
import renderingReducer from './renderingSlice';

const store = configureStore({
  reducer: renderingReducer,
});

export default store;
