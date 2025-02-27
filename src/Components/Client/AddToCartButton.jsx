'use client'; 

import { useDispatch } from 'react-redux';
import { addToCart } from '@/Redux/Actions';

export default function AddToCartButton({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <button className="btn btn-primary" onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
