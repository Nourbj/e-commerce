"use client"; 

import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, updateQuantity, selectCart } from "@/Redux/cartSlice";

function ProductShop({ image, name, price, oldPrice, id }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const handleAddToCart = (event) => {
    event.preventDefault(); // Empêche la redirection de la page

    const existingProduct = cart.items.find((product) => product.id === id);

    if (existingProduct) {
      dispatch(updateQuantity({ id: existingProduct.id, qty: existingProduct.qty + 1 }));
    } else {
      const product = { 
        id: id || new Date().getTime(), 
        name, 
        price, 
        image, 
        qty: 1 
      };
      dispatch(addItemToCart(product));  
    }
  };

  return (
    <div className="product-item">
      <div className="product-image">
        <img 
          src={image} 
          alt={name} 
          className="img-fluid" 
          loading="lazy" 
        />
      </div>
      <h3>{name}</h3>
      <div className="product-price">
        <ins>${price}</ins>
        {oldPrice && <del>${oldPrice}</del>}
      </div>
      <div className="product-add-to-cart">
        <button 
          className="btn btn-primary" 
          onClick={handleAddToCart} 
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductShop;
