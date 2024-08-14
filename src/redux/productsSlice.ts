import getAllProducts from "@/app/components/admin/service/Product.Service";
import { Product } from "@/app/products/model/Product";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ProductsState {
  items: Product[];
  allItems: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchQuery: string;
  selectedCategories: number[];
}

const initialState: ProductsState = {
  items: [],
  allItems: [],
  status: "idle",
  error: null,
  searchQuery: "",
  selectedCategories: [], 
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await getAllProducts();
    return response;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQueryFunc(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.items = filterProducts(state);
    },
    toggleCategory(state, action: PayloadAction<number>) {
      const categoryId = action.payload;
      if (state.selectedCategories.includes(categoryId)) {
        state.selectedCategories = state.selectedCategories.filter(id => id !== categoryId);
      } else {
        state.selectedCategories.push(categoryId);
      }
      state.items = filterProducts(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.allItems = action.payload;
          state.items = filterProducts(state);
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});


const filterProducts = (state: ProductsState): Product[] => {
  return state.allItems.filter(product => {
    const matchesSearchQuery = product.name.toLowerCase().includes(state.searchQuery.toLowerCase());
    const matchesCategory = state.selectedCategories.length === 0 || state.selectedCategories.includes(product.category_id);
    return matchesSearchQuery && matchesCategory;
  });
};

export const { setSearchQueryFunc, toggleCategory } = productsSlice.actions;
export default productsSlice.reducer;
