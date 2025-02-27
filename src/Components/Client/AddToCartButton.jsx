'use client';

import { useDispatch } from "react-redux";

function AddToCartButton({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <button onClick={handleAddToCart} className="btn btn-primary">
      Add to Cart
    </button>
  );
}

export default AddToCartButton;