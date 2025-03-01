"use client"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getProductById } from "@/Services/Product"; 
import ProductWidget from "../Server/ProductWidget/Productwidget";

export default function RecentlyViewed() {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  useEffect(() => {
    const cookieData = Cookies.get("recentlyViewed");
    if (!cookieData) return;

    try {
      const productIds = JSON.parse(cookieData); 

      Promise.all(productIds.map(id => getProductById(id)))
        .then(products => {
          setRecentlyViewedProducts(products);
        })
        .catch(error => console.error("Erreur chargement produits:", error));
    } catch (error) {
      setRecentlyViewedProducts([]);
    }
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
    <ProductWidget title="Recently Viewed" products={recentlyViewedProducts} />
  </div>
  );
}
