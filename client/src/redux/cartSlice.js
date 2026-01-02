import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//GET
const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo?.token;
};

//FETCH
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const cartItems = await res.json();

      // hydrate cart with product details
      const detailedItems = await Promise.all(
        cartItems.map(async (item) => {
          const productRes = await fetch(
            `http://localhost:5000/api/products/${item.product}`
          );
          const product = await productRes.json();

          return {
            product: item.product,
            quantity: item.quantity,
            price: product.price,
            name: product.name,
            image: product.image,
            description: product.description,
            seller: product.brand || "Seller",
          };
        })
      );

      return detailedItems;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Failed to fetch cart");
    }
  }
);

//ADD
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      // 🔥 ALWAYS re-fetch full cart
      thunkAPI.dispatch(fetchCart());
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Failed to add to cart");
    }
  }
);

//UPDATE
export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ quantity }),
      });

      // 🔥 re-fetch cart
      thunkAPI.dispatch(fetchCart());
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Failed to update quantity");
    }
  }
);

//REMOVE
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, thunkAPI) => {
    try {
      await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      // 🔥 re-fetch cart
      thunkAPI.dispatch(fetchCart());
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Failed to remove item");
    }
  }
);

//cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
