import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async ({ search = "", category = "" }) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/products?search=${search}&category=${category}`
    );
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categories: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});



export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/products/categories"
    );
    return data ;
  }
);

export default productSlice.reducer;
