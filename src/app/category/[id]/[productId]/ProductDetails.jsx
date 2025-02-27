'use client';

import dynamic from 'next/dynamic';
import ProductDescription from "@/Components/Server/ProductDescription";
const AddToCartButton = dynamic(() => import('@/Components/Client/AddToCartButton'), { ssr: false });

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
        <AddToCartButton product={product} />
      </form>
      <ProductDescription description={product.description} />
    </div>
  );
}