"use client";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart, updateQuantity } from "@/Redux/cartSlice"; 
import Link from "next/link";

function PanierItem() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const handleDecreaseQuantity = (item) => {
    if (item.qty > 1) {
      dispatch(updateQuantity({ id: item.id, qty: item.qty - 1 }));
    } else {
      if (window.confirm("Do you really want to remove this item from the cart?")) {
        dispatch(removeItemFromCart(item.id));
      }
    }
  };

  const handleQuantityChange = (e, item) => {
    let newQty = Number(e.target.value);
    if (newQty > 0 && !isNaN(newQty)) {
      dispatch(updateQuantity({ id: item.id, qty: newQty }));
    }
  };

  return (
    <div>
      <table cellSpacing={0} className="shop_table cart">
        <thead>
          <tr>
            <th className="product-remove">&nbsp;</th>
            <th className="product-name">Product</th>
            <th className="product-price">Price</th>
            <th className="product-quantity">Quantity</th>
            <th className="product-subtotal">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={5}>Your cart is empty.</td>
            </tr>
          ) : (
            items.map((item) => {
              const price = Number(item.price); // Convert price to a number

              return (
                <tr key={item.id}>
                  <td className="product-remove">
                    <button
                      type="button"
                      className="remove"
                      title="Remove this item"
                      onClick={() => dispatch(removeItemFromCart(item.id))}
                    >
                      ×
                    </button>
                  </td>

                  <td className="product-name">{item.name}</td>

                  <td className="product-price">
                    <span className="amount">{price.toFixed(2)} €</span>
                  </td>

                  <td className="product-quantity">
                    <div className="quantity buttons_added">
                      <button
                        type="button"
                        className="minus"
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        -
                      </button>

                      <input
                        type="number"
                        size={4}
                        className="input-text qty text"
                        title="Qty"
                        value={item.qty}
                        min={1}
                        onChange={(e) => handleQuantityChange(e, item)}
                      />

                      <button
                        type="button"
                        className="plus"
                        onClick={() => dispatch(updateQuantity({ id: item.id, qty: item.qty + 1 }))}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="product-subtotal">
                    <span className="amount">{(price * item.qty).toFixed(2)} €</span>
                  </td>
                </tr>
              );
            })
          )}

          <tr key="checkout-row">
            <td className="actions" colSpan={5}>
              <Link href="/checkout">
                <button type="button" className="checkout-button button alt wc-forward">
                  Checkout
                </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PanierItem;
