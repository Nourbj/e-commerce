import { useSelector } from 'react-redux';

const Order = () => { 
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const tax = useSelector((state) => state.cart.tax);

  return (   
    <table className="shop_table">
      <thead>
        <tr>
          <th className="product-name">Product</th>
          <th className="product-total">Total</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item, index) => (
          <tr key={`${item.id}-${index}`} className="cart_item">
            <td className="product-name">
              {item.name} <strong className="product-quantity">× {item.qty}</strong>
            </td>
            <td className="product-total">
              <span className="amount">{(item.price * item.qty).toFixed(2)} $</span>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="cart-subtotal">
          <th>Cart Subtotal</th>
          <td>
            <span className="amount">{subTotal.toFixed(2)} $</span>
          </td>
        </tr>
        <tr className="shipping">
          <th>Taxe (20%)</th>
          <td>{tax.toFixed(2)} €</td>
        </tr>
        <tr className="order-total">
          <th>Order Total</th>
          <td>
            <strong>
              <span className="amount">{total.toFixed(2)} $</span>
            </strong>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};


export default Order;
