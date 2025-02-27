"use client"; 

import { useSelector } from "react-redux";
import Intrest from "@/Components/Client/Intrest";
import CartTotals from "@/Components/Client/CartTotals";
import PanierItem from "@/Components/Client/PanierItem";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  if (!cart || !cart.items) {
    return <p>Chargement du panier...</p>;
  }
  return (
    <div className="single-product-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="product-content-right">
              <div className="woocommerce">
              <PanierItem items={cart.items} />
                <div className="cart-collaterals">
                  <Intrest />
                  <CartTotals
                    subTotal={(cart.subTotal || 0).toFixed(2)}
                    tax={(cart.tax || 0).toFixed(2)}
                    total={(cart.total || 0).toFixed(2)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
