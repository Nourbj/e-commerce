"use client"; 

import { useState, useEffect } from 'react'; 
import "./globals.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import "../assets/css/font-awesome.min.css";
import Header from "../Components/Server/Header/HeaderServer";
import Navbar from "../Components/Server/Navbar";
import Footer from "../Components/Server/Footer";
import { fetchCategories } from "@/Services/Category"; 
import { ReduxProvider } from "@/Redux/Provider";
import { usePathname } from "next/navigation"; 

export default function Layout({ children }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const { data, error } = await fetchCategories();
        if (error) {
          setError(error);
        } else {
          setCategories(data);
        }
      } catch (err) {
        setError(err.message || "Une erreur est survenue");
      }
    };

    fetchCategoriesData();
  }, []); // L'effet se déclenche au montage du composant
  
  if (error) {
    return <div>Erreur : {error}</div>;
  }

  // Obtenir le chemin actuel et ne pas afficher Navbar sur certaines pages
  const pathname = usePathname();
  const hideNavbar = pathname.includes("checkout") || pathname.includes("cart");

  return (
    <html lang="fr">
      <body>
        <ReduxProvider>
          <Header />
          {!hideNavbar && <Navbar categories={categories} />}
          <main>{children}</main>
          <Footer categories={categories} />
        </ReduxProvider>
      </body>
    </html>
  );
}
