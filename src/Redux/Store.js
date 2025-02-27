import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Actions";


export const store = configureStore({
  reducer: {
    cart: cartReducer, 
  },
});

export const selectCart = (state) => state.cart; 

