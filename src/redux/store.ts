// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../redux/cartSlice';
import productsSlice from './productsSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productsSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
