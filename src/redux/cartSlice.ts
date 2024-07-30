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
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};


const storeInLocalStorage = (data: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(data));
};

const calculateCartTotals = (carts: CartItem[]) => {
  const itemCount = carts.reduce((count, item) => count + item.quantity, 0);
  const totalAmount = carts.reduce((total, item) => total + item.price * item.quantity, 0);
  return { itemCount, totalAmount };
};

const initialState: CartState = {
  carts: fetchFromLocalStorage(),
  ...calculateCartTotals(fetchFromLocalStorage()),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.carts.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.carts.push(action.payload);
      }
      const { itemCount, totalAmount } = calculateCartTotals(state.carts);
      state.itemCount = itemCount;
      state.totalAmount = totalAmount;
      storeInLocalStorage(state.carts);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
      const { itemCount, totalAmount } = calculateCartTotals(state.carts);
      state.itemCount = itemCount;
      state.totalAmount = totalAmount;
      storeInLocalStorage(state.carts);
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
      const item = state.carts.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      const { itemCount, totalAmount } = calculateCartTotals(state.carts);
      state.itemCount = itemCount;
      state.totalAmount = totalAmount;
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
