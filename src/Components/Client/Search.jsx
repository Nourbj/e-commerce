"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getProductById } from "@/Services/Product";

const API_BASE_URL = "http://localhost:3000";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  const router = useRouter();
  const { category: categoryName, productId } = router.query || {};

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const existingProduct = allProducts.find(p => p.id === productId);
        if (existingProduct) {
          setProduct(existingProduct);
        } else {
          try {
            const data = await getProductById(productId);
            setProduct(data);
          } catch (error) {
            console.error("Error fetching product:", error);
            setError("Failed to fetch product details");
          }
        }
      }
    };

    if (productId) fetchProduct();
  }, [productId, allProducts]);

  useEffect(() => {
    if (categoryName) {
      setCategory({
        id: categoryName,
        name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
      });
    }
  }, [categoryName]);

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    const filteredResults = allProducts.filter((product) =>
      product.name.toLowerCase().startsWith(query)
    );

    setSearchResults(filteredResults);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="search-container">
      <div className="header-search">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <ul className="results-list">
            {searchResults.map((result) => (
              <li key={result.id} className="result-item">
                <Link
                  href={`/category/${category?.id || "c200"}/${result.id}`}
                  passHref
                >
                  <span>{result.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
                            