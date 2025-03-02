"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getProductById } from "@/Services/Product";
import ViewAllButton from "./ViewAll";

const RecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookieData = Cookies.get("recentlyViewed");
    if (!cookieData) {
      setLoading(false);
      return;
    }

    try {
      const productIds = JSON.parse(cookieData);

      Promise.all(productIds.map(id => getProductById(id)))
        .then(products => {
          setRecentlyViewed(products);
        })
        .catch(error => {
          console.error("Error loading products:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error parsing cookies:", error);
      setRecentlyViewed([]);
      setLoading(false);
    }
  }, []);

  return (
    <div className="single-product-widget" style={{ margin: "0 auto" }}>
      <h2 className="product-wid-title">Recently Viewed</h2>

      {loading ? (
        <p>Loading...</p>
      ) : recentlyViewed.length === 0 ? (
        <p>No recently viewed products</p>
      ) : (
        <ViewAllButton products={recentlyViewed} /> 
      )}
    </div>
  );
};

export default RecentlyViewed;
