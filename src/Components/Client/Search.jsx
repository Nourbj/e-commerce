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
    <style jsx>{`
      /* Container pour la barre de recherche */
      .search-container {
        display: flex;
        justify-content: center; /* Centre horizontalement */
        align-items: center;     /* Centre verticalement */
        width: 100%;
        padding-top: 10px;       /* Espace en haut */
      }
  
      /* Conteneur pour l'input de recherche */
      .header-search {
        width: 100%;
        max-width: 500px;        /* Limite la largeur de la barre de recherche */
      }
  
      /* Style pour l'input de recherche */
      .search-input {
        width: 100%;             /* Prend toute la largeur du conteneur */
        padding: 12px 20px;      /* Espacement interne */
        border-radius: 5px;      /* Coins arrondis */
        border: 1px solid #ccc;  /* Bordure gris clair */
        font-size: 16px;         /* Taille du texte */
        background-color: #f9f9f9; /* Fond clair */
        transition: all 0.3s ease; /* Transition douce lors du focus */
      }
  
      /* Effet de focus sur l'input */
      .search-input:focus {
        border-color: #007bff;   /* Bordure bleue lors du focus */
        outline: none;           /* Retirer l'outline */
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Ombre lors du focus */
      }
    `}</style>
  

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
                            