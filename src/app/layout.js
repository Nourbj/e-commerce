// app/layout.js
import "./globals.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import "../assets/css/font-awesome.min.css";
import Header from "../Components/Server/Header/HeaderServer";
import Footer from "../Components/Server/Footer";
import { ReduxProvider } from "@/Redux/Provider";
import NavbarServer from "@/Components/Server/Navbar";
import { fetchCategories } from "@/Services/Category";

export default async function Layout({ children }) {
  const { data: categories, error } = await fetchCategories();

  if (error) {
    return <div>Erreur : {error.message || "Une erreur est survenue"}</div>;
  }

  return (
    <html lang="fr">
      <body>
        <ReduxProvider>
          <Header />
          <NavbarServer />
          <main>{children}</main>
          <Footer categories={categories} />
        </ReduxProvider>
      </body>
    </html>
  );
}