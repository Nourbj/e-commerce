'use client';
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "@/Redux/Actions";

function PanierItem() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

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
            items.map((item, index) => {
              const price = Number(item.price);
              return (
                <tr key={`${item.id}-${index}`}>
                  <td className="product-remove">
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="remove"
                      title="Remove this item"
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
                        className="minus"
                        onClick={() => {
                          if (item.qty === 1) {
                            dispatch(removeFromCart(item.id));
                          } else {
                            dispatch(updateQuantity({ id: item.id, qty: item.qty - 1 }));
                          }
                        }}
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
                        onChange={(e) => {
                          const newQty = Number(e.target.value);
                          if (newQty > 0 && !isNaN(newQty)) {
                            dispatch(updateQuantity({ id: item.id, qty: newQty }));
                          }
                        }}
                      />
                      <button
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PanierItem;
