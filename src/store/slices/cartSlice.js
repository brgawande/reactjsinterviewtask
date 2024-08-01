import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      console.log("state", state);
      console.log(item);

      // Check if the item already exists in the cart
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        // Update quantity of existing item
        state.totalPrice -= existingItem.price * existingItem.quantity; // Remove old total
        existingItem.quantity += item.quantity;
        state.totalPrice += existingItem.price * existingItem.quantity; // Add new total
      } else {
        // Add new item to the cart
        state.items.push(item);
        state.totalPrice += item.price * item.quantity;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const itemToRemove = state.items.find((item) => item.id === id);

      if (itemToRemove) {
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
