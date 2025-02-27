let categoriesCache = []; 

export async function fetchCategories() {
  try {
    const response = await fetch('http://localhost:3000/categories');

    if (!response.ok) {
      throw new Error(`Erreur de l'API : ${response.statusText}`);
    }

    const categories = await response.json();
    categoriesCache = categories; 
    return { data: categories, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
}


export const getCategoryFromImage = (imageName) => {
  if (!imageName) return "Unknown";  
  const category = imageName.split("-")[0].toLowerCase(); 
  return category.charAt(0).toUpperCase() + category.slice(1);  
};