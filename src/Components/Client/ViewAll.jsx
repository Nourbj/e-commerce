"use client";
import { useState } from "react";
import { getCategoryFromImage } from "@/Services/Category";
import ProductItem from "../Server/ProductItem";

export default function ViewAllButton({ products }) {
  const [showAll, setShowAll] = useState(false);

  const handleViewAllClick = (e) => {
    e.preventDefault();
    setShowAll(!showAll);
  };

  const displayedProducts = showAll ? products : products.slice(0, 2);

  return (
    <div>
      {displayedProducts.map((product, index) => {
        const price = Number(product.price) || 0;
        const discountRate = Number(product.discountRate) || 0;
        const oldPrice =
          discountRate > 0 ? price + price * (discountRate / 100) : null;
        const category = getCategoryFromImage(product.imageName);
        const imagePath = `/img/products-img/${category}/${product.imageName}`;

        return (
          <ProductItem
            key={product.id || index}
            image={imagePath}
            alt={product.name}
            name={product.name}
            rating={product.review}
            price={price}
            oldPrice={oldPrice}
            
          />
        );
      })}
      {products.length > 2 && (
        <a href="#" onClick={handleViewAllClick}  className="view-all-button">
          {showAll ? "View Less" : "View All"}
        </a>
      )}
    </div>
  );
}
