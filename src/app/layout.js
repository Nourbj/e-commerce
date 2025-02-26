import "./globals.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "./assets/css/font-awesome.min.css";
import Header from "./components/Server/Header";
import Navbar from "./Components/Server/Navbar";
import Footer from "./Components/Server/Footer";
import { fetchCategories } from "@/app/Services/Category"; 

export default async function Layout({ children }) {
  const { data: categories, error } = await fetchCategories();

  if (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    return <div>Erreur : {error}</div>; 
  }

  console.log("Catégories dans Layout :", categories); 

  return (
    <html lang="fr">
      <body>
        <Header />
        <Navbar categories={categories} /> 
        <main>{children}</main>
        <Footer categories={categories} /> 
      </body>
    </html>
  );
}