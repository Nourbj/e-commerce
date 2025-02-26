let categoriesCache = []; // Stocke les catégories récupérées

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

export function getCategoryFolder(categoryId) {
  if (categoriesCache.length === 0) {
    return "default";
  }

  const category = categoriesCache.find((c) => c.id === categoryId);
  return category ? category.name.toLowerCase() : "default"; 
}
