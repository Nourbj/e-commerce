import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const saveCartToLocalStorage = (cart) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

const loadCartFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    return savedCart
      ? JSON.parse(savedCart)
      : { id: uuidv4(), items: [], total: 0, subTotal: 0, tax: 0 };
  }
  return { id: uuidv4(), items: [], total: 0, subTotal: 0, tax: 0 };
};

const updateCartTotals = (items) => {
  const subTotal = items.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0);
  const tax = subTotal * 0.2; // Taux de taxe à 20%
  const total = subTotal + tax;
  return { subTotal, tax, total };
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await fetch('http://localhost:3000/carts');
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  return response.json();
});

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (product, { getState, dispatch }) => {
    const cart = getState().cart;
    let updatedItems = [...cart.items];

    const existingItemIndex = updatedItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex].qty += product.qty;
    } else {
      updatedItems.push(product);
    }

    const { subTotal, tax, total } = updateCartTotals(updatedItems);

    const updatedCart = {
      id: cart.id || uuidv4(),
      items: updatedItems,
      total,
      subTotal,
      tax,
    };

    saveCartToLocalStorage(updatedCart);

    dispatch(cartSlice.actions.updateCart(updatedCart));

    const method = cart.id ? 'PUT' : 'POST';
    const url = cart.id ? `http://localhost:3000/carts/${cart.id}` : 'http://localhost:3000/carts';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCart),
    });

    if (!response.ok) {
      throw new Error('Failed to update the cart');
    }

    return response.json();
  }
);

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      const { subTotal, tax, total } = updateCartTotals(state.items);
      state.subTotal = subTotal;
      state.tax = tax;
      state.total = total;

      saveCartToLocalStorage(state);
    },
    updateQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].qty = action.payload.qty;
      }
      const { subTotal, tax, total } = updateCartTotals(state.items);
      state.subTotal = subTotal;
      state.tax = tax;
      state.total = total;

      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.subTotal = 0;
      state.tax = 0;
      state.total = 0;
      saveCartToLocalStorage(state);
    },
    updateCart: (state, action) => {
      state.id = action.payload.id;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.subTotal = action.payload.subTotal;
      state.tax = action.payload.tax;
      saveCartToLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.subTotal = action.payload.subTotal;
        state.tax = action.payload.tax;
        saveCartToLocalStorage(state);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        console.error('Failed to fetch cart:', action.error.message);
      });
  },
});

export const selectCart = (state) => state.cart;

export const { removeItemFromCart, updateQuantity, clearCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;