import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []

}


export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToCart", (state, action) => {
      const item = action.payload;

      // Check for an existing item with the same attributes
      const existingItemIndex = state.cart.findIndex(
        (i) =>
          i._id === item._id &&
          i.selectedColor === item.selectedColor &&
          i.showWithChain === item.showWithChain &&
          i.selectedEnamelColor === item.selectedEnamelColor
      );

      if (existingItemIndex > -1) {
        // Update quantity of the existing item
        state.cart[existingItemIndex].qty += item.qty;
      } else {
        // Add new item to the cart
        state.cart.push(item);
      }

      // Update localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    })
    .addCase("removeFromCart", (state, action) => {
      const { _id, selectedColor, showWithChain, selectedEnamelColor } = action.payload;
      
      // Log the payload to verify its content

      // Filter out the item based on all attributes
      state.cart = state.cart.filter(
          (i) =>
              !(i._id === _id &&
                i.selectedColor === selectedColor &&
                i.showWithChain === showWithChain &&
                i.selectedEnamelColor === selectedEnamelColor)
      );

      // Update localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
  });



})