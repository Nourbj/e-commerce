import { createSlice } from "@reduxjs/toolkit";
import { handleCart } from "@/Services/Cart";
const initialState = { 
  cartId: null,
  items: [],
  total: 0,
  subTotal: 0,
  tax: 0,
};

const Actions = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartId = action.payload.id || state.cartId; 
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.subTotal = action.payload.subTotal;
      state.tax = action.payload.tax;
    },
    clearCart: (state) => {
      state.cartId = null;
      state.items = [];
      state.total = 0;
      state.subTotal = 0;
      state.tax = 0;
    },
    addItem: (state, action) => {
      const updatedItem = action.payload;
      const existingItem = state.items.find(item => item.id === updatedItem.id);

      if (existingItem) {
        existingItem.qty += updatedItem.qty;
      } else {
        state.items.push(updatedItem);
      }

      state.subTotal = state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
      state.tax = state.subTotal * 0.12;
      state.total = state.subTotal + state.tax;

      // Sauvegarder dans le service cart (création ou mise à jour)
      handleCart(state, updatedItem).then(updatedCart => {
        state.cartId = updatedCart.id;
        state.items = updatedCart.items;
        state.total = updatedCart.total;
        state.subTotal = updatedCart.subTotal;
        state.tax = updatedCart.tax;
      });
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== productIdToRemove);

      if (state.items.length === 0) {
        state.total = 0;
        state.subTotal = 0;
        state.tax = 0;
      } else {
        state.subTotal = state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
        state.tax = state.subTotal * 0.12;
        state.total = state.subTotal + state.tax;
      }

      // Mise à jour du panier sur le serveur après suppression
      if (state.cartId) {
        handleCart(state, {}).then(updatedCart => {
          state.cartId = updatedCart.id;
          state.items = updatedCart.items;
          state.total = updatedCart.total;
          state.subTotal = updatedCart.subTotal;
          state.tax = updatedCart.tax;
        });
      }
    },
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        item.qty = qty;
        state.subTotal = state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
        state.tax = state.subTotal * 0.12;
        state.total = state.subTotal + state.tax;

        // Sauvegarder la mise à jour sur le serveur
        if (state.cartId) {
          handleCart(state, {}).then(updatedCart => {
            state.cartId = updatedCart.id;
            state.items = updatedCart.items;
            state.total = updatedCart.total;
            state.subTotal = updatedCart.subTotal;
            state.tax = updatedCart.tax;
          });
        }
      }
    },
  },
});

export const { setCart, addItem, removeFromCart, updateQuantity, clearCart } = Actions.actions;

export default Actions.reducer;
