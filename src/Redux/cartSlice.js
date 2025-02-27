import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

// Fonction pour sauvegarder le panier dans localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Fonction pour charger le panier depuis localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : { id: uuidv4(), items: [], total: 0, subTotal: 0, tax: 0 }; // Generate ID if not found
};

// Fonction pour calculer les totaux du panier
const updateCartTotals = (items) => {
  const subTotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subTotal * 0.2; // Calcul de la taxe à 20%
  const total = subTotal + tax; // Total = sous-total + taxe
  return { subTotal, tax, total };
};

// Action asynchrone pour récupérer le panier depuis le serveur
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await fetch('http://localhost:3000/carts');
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  return response.json();
});

// Action asynchrone pour ajouter un produit au panier
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (product, { getState }) => {
    const cart = getState().cart;
    let updatedItems = [...cart.items];

    // Vérification de la présence du produit dans le panier
    const existingItemIndex = updatedItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      // Si l'item existe déjà, mettez simplement à jour la quantité
      updatedItems[existingItemIndex].qty += product.qty;
    } else {
      // Sinon, ajoutez le nouveau produit
      updatedItems.push(product);
    }

    // Calcul des totaux
    const { subTotal, tax, total } = updateCartTotals(updatedItems);

    const updatedCart = {
      id: cart.id || uuidv4(), // Generate ID if not exists
      items: updatedItems,
      total,
      subTotal,
      tax,
    };

    // Sauvegarde en localStorage
    saveCartToLocalStorage(updatedCart);

    // Envoi au backend (POST si nouveau, PUT si déjà existant)
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
    clearCart: (state) => { // Action to clear cart
      state.items = [];
      state.subTotal = 0;
      state.tax = 0;
      state.total = 0;
      saveCartToLocalStorage(state);
    }
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
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.id = action.payload.id; // Store the cart ID if it exists
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.subTotal = action.payload.subTotal;
        state.tax = action.payload.tax;

        saveCartToLocalStorage(state);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        console.error('Failed to fetch cart:', action.error.message);
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        console.error('Failed to add item to cart:', action.error.message);
      });
  },
});

export const selectCart = (state) => state.cart;

export const { removeItemFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
