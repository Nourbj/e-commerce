import Cookies from "js-cookie";
export async function getTopSellersProducts() {
    try {
      const response = await fetch('http://localhost:3000/top-sellers-products');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data = await response.json();
  
      if (!Array.isArray(data)) {
        throw new Error('Les données ne sont pas un tableau');
      }
  
      return data;
    } catch (error) {
      console.error('Erreur dans getTopSellersProducts:', error.message);
      return []; 
    }
  }




  export async function getTopNewProducts() {
    try {
      const response = await fetch('http://localhost:3000/top-new-products');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data = await response.json();
    
      if (!Array.isArray(data)) {
        throw new Error('Les données ne sont pas un tableau');
      }
  
      return data;
    } catch (error) {
      console.error('Erreur dans getTopNewProducts:', error.message);
      return []; 
    }
  }
  export const getProductsByCategory = async (categoryId) => {
    try {
      const categoriesResponse = await fetch('http://localhost:3000/categories');
      const categories = await categoriesResponse.json();
      const category = categories.find((item) => item.id === categoryId); 
      const categoryName = category ? category.name : 'default';  
      const productsListsResponse = await fetch('http://localhost:3000/products-lists');
      const productsLists = await productsListsResponse.json();
      const productList = productsLists.find((list) => list.id === category.productListId);
      
      return {
        categoryName,
        products: productList ? productList.items : [],
      };
    } catch (error) {
      return { categoryName: 'default', products: [] };
    }
  };
  
  export const getProductById = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`);
      if (!response.ok) {
        console.error(`Produit non trouvé avec l'ID: ${productId}`);
        return null;  // Retourne null si le produit n'est pas trouvé
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Erreur dans getProductById: ${error}`);
      return null;
    }
  };
  


export const addToRecentlyViewed = (productId) => {
  let viewedProducts = Cookies.get("recentlyViewed");
  viewedProducts = viewedProducts ? JSON.parse(viewedProducts) : [];

  if (!viewedProducts.includes(productId)) {
    viewedProducts.unshift(productId); // Ajouter en début de tableau
  }

  if (viewedProducts.length > 10) {
    viewedProducts.pop(); // Limiter à 10 produits
  }

  Cookies.set("recentlyViewed", JSON.stringify(viewedProducts), { expires: 7 });
};

  
  export const getRecentlyViewedProducts = async (getAll = false) => {
    let viewedProducts = Cookies.get("recentlyViewed");
    viewedProducts = viewedProducts ? JSON.parse(viewedProducts) : [];
  
    if (viewedProducts.length === 0) return [];
  
    const productDetails = await Promise.all(
      viewedProducts.map(async (id) => {
        const product = await getProductById(id);
        return product;
      })
    );
  
    return getAll ? productDetails : productDetails.slice(0, 3);
  };
  

  