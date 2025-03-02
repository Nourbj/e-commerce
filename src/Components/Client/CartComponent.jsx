"use client"; // Assurer que le code s'exécute côté client (Next.js 13+ avec App Router)

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { updateCart } from "@/Redux/cartSlice";

function CartComponent() {
  const dispatch = useDispatch();
  const { total, items } = useSelector((state) => state.cart);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          dispatch(updateCart(JSON.parse(savedCart)));
        }
      }
    };

    loadCart();
    setHydrated(true);
  }, [dispatch]);

  if (!hydrated) {
    return null; // or a loading spinner
  }

  const itemCount = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="col-sm-6">
      <div className="shopping-item" style={{ cursor: "pointer" }}>
        <Link href="/cart">
          Cart : <span className="cart-amunt">{total ? total.toFixed(2) : '0.00'} €</span>{" "}
          <i className="fa fa-shopping-cart"></i>{" "}
          <span className="product-count">{itemCount}</span>
        </Link>
      </div>
    </div>
  );
}

export default CartComponent;