import { fetchCategories } from "@/Services/Category";
import NavbarClient from "./NavbarClient"; 

export default async function NavbarServer() {
  const { data: categories, error } = await fetchCategories();

  if (error) {
    console.error("Failed to fetch categories:", error);
    return null; 
  }
  return <NavbarClient categories={categories} />;
}