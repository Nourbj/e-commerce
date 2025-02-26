export async function fetchCategories() {
  try {
    console.log("Début de l'appel API..."); // Vérifiez que l'appel est déclenché
    const response = await fetch('http://localhost:3000/categories');

    if (!response.ok) {
      throw new Error(`Erreur de l'API : ${response.statusText}`);
    }

    const categories = await response.json();
    console.log("Catégories récupérées :", categories); // Vérifiez les données
    return { data: categories, error: null };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    return { data: [], error: error.message };
  }
}