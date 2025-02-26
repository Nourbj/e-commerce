import { getProductsByCategory } from "../Services/Product";


export default async function TestPage() {
  const categoryId = '100'; // Remplacez par l'ID de la catégorie que vous souhaitez tester
  const products = await getProductsByCategory(categoryId);

  return (
    <div>
      <h1>Test de la fonction getProductsByCategory</h1>
      <h2>Catégorie ID : {categoryId}</h2>

      {products.length === 0 ? (
        <p>Aucun produit trouvé pour cette catégorie.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>Prix : ${product.price}</p>
              <p>Réduction : {product.discountRate}%</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}