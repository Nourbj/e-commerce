// Components/Server/Navbar/NavbarServer.js
import { fetchCategories } from "@/Services/Category";
import NavbarClient from "../Client/NavbarClient"; // Import the Client Component

export default async function NavbarServer() {
  // Fetch categories on the server
  const { data: categories, error } = await fetchCategories();

  if (error) {
    console.error("Failed to fetch categories:", error);
    return null; // Handle the error gracefully
  }

  // Pass the categories to the Client Component
  return <NavbarClient categories={categories} />;
}