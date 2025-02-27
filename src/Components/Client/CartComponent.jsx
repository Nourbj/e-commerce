"use client"; // Assurer que le code s'exécute côté client (Next.js 13+ avec App Router)

import { useSelector } from "react-redux";
import Link from "next/link";

function CartComponent() {


  return (
    <div className="col-sm-3">
      <div className="shopping-item" style={{ cursor: "pointer" }}>
        <Link href="/cart">
          Cart : <span className="cart-amunt">50 €</span>{" "}
          <i className="fa fa-shopping-cart"></i>{" "}
          <span className="product-count"></span>
        </Link>
      </div>
    </div>
  );
}

export default CartComponent;
