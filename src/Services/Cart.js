const API_URL = "http://localhost:3000/carts";

export const handleCart = (cart, updatedItem) => {
  if (cart.cartId) {
    const updatedCart = {
      ...cart,
      total: cart.total + updatedItem.price * updatedItem.qty,
      subTotal: cart.subTotal + updatedItem.price * updatedItem.qty,
      tax: cart.tax + (updatedItem.price * updatedItem.qty) * 0.12,
      items: [...cart.items, updatedItem],
    };
    return fetch(`${API_URL}/${cart.cartId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCart),
    })
    .then(response => response.json())
    .then(updatedCart => {
      console.log('Panier mis à jour:', updatedCart);
      return updatedCart;
    })
    .catch(error => {
      console.error("Erreur lors de la mise à jour du panier:", error);
    });
  } else {
    const newCart = {
      total: updatedItem.price * updatedItem.qty,
      subTotal: updatedItem.price * updatedItem.qty,
      tax: (updatedItem.price * updatedItem.qty) * 0.12,
      items: [updatedItem],
    };

    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCart),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Panier créé:', data);
      return data;
    })
    .catch(error => {
      console.error("Erreur lors de la création du panier:", error);
    });
  }
};
