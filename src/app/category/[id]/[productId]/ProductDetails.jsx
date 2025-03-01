'use client';

import ProductDescription from "@/Components/Server/ProductDescription";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, updateQuantity, selectCart } from "@/Redux/cartSlice";

export default function ProductDetailsClient({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const handleAddToCart = (event) => {
    event.preventDefault(); // Empêche la redirection de la page

    // Accéder correctement aux propriétés de product
    const { id, name, price, image } = product;
    
    const existingProduct = cart.items.find((product) => product.id === id);

    if (existingProduct) {
      dispatch(updateQuantity({ id: existingProduct.id, qty: existingProduct.qty + 1 }));
    } else {
      const productToAdd = { 
        id, 
        name, 
        price, 
        image, 
        qty: 1 
      };
      dispatch(addItemToCart(productToAdd));  
    }
  };

  return (
    <div className="product-inner">
      <h2 className="product-name">{product.name}</h2>
      <div className="product-inner-price">
        <ins>{product.price} €</ins>
        {product.oldPrice && <del>{product.oldPrice} €</del>}
      </div>
      <form className="cart">
        <div className="quantity">
          <input
            type="number"
            className="input-text qty text"
            title="Qty"
            defaultValue={1}
            name="quantity"
            min={1}
            step={1}
          />
        </div>
        <button 
          className="btn btn-primary" 
          onClick={handleAddToCart} 
        >
          Add to Cart
        </button>
      </form>
      <ProductDescription description={product.description} />
    </div>
  );
}
