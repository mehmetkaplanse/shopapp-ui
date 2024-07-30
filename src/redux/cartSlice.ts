import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  image?: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  carts: CartItem[];
  itemCount: number;
  totalAmount: number;
}

const fetchFromLocalStorage = (): CartItem[] => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};

const storeInLocalStorage = (data: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(data));
};

const initialState: CartState = {
  carts: fetchFromLocalStorage(),
  itemCount: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
        const isItemInCart = state.carts.find((item) => item.id === action.payload.id);
        if (isItemInCart) {
            isItemInCart.quantity += action.payload.quantity;
        } else {
            state.carts.push(action.payload);
        }
        state.itemCount = state.carts.reduce((count, item) => count + item.quantity, 0);
        state.totalAmount = state.carts.reduce((total, item) => total + item.price * item.quantity, 0);
        storeInLocalStorage(state.carts);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
        state.carts = state.carts.filter((item) => item.id !== action.payload);
        state.itemCount = state.carts.reduce((count, item) => count + item.quantity, 0);
        state.totalAmount = state.carts.reduce((total, item) => total + item.price * item.quantity, 0);
        storeInLocalStorage(state.carts);
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
        const item = state.carts.find((item) => item.id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity;
        }
        state.itemCount = state.carts.reduce((count, item) => count + item.quantity, 0);
        state.totalAmount = state.carts.reduce((total, item) => total + item.price * item.quantity, 0);
        storeInLocalStorage(state.carts);
    },
    clearCart: (state) => {
        state.carts = [];
        state.itemCount = 0;
        state.totalAmount = 0;
        storeInLocalStorage(state.carts);
    },

  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
