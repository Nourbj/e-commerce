'use client';

import ProductDescription from "@/Components/Server/ProductDescription";

export default function ProductDetailsClient({ product }) {
  
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
        <button className="add_to_cart_button" onClick={() => handleAddToCart(product)}>
                Add to cart
        </button>
      </form>
      <ProductDescription description={product.description} />
    </div>
  );
}