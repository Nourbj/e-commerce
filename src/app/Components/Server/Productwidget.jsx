import ProductItem from './ProductItem';
import Image from 'next/image';

export const getCategoryFromImage = (imageName) => {
  if (!imageName) return "Unknown";  
  const category = imageName.split("-")[0].toLowerCase();
  return category.charAt(0).toUpperCase() + category.slice(1);  
};

export default function ProductWidget({ title, products }) {
  if (!products || products.length === 0) {
    return (
      <div className="col-md-4">
        <div className="single-product-widget">
          <h2 className="product-wid-title">{title}</h2>
          <p>Aucun produit disponible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-4">
      <div className="single-product-widget">
        <h2 className="product-wid-title">{title}</h2>

        {products.map((product) => {
          const oldPrice = product.discountRate
            ? product.price + (product.price * (product.discountRate / 100))
            : null;

          const category = getCategoryFromImage(product.imageName);

          const imageSrc = product.imageName ? `/img/${category}/${product.imageName}` : '/img/default-image.jpg';

          return (
            <ProductItem
              key={product.id}
              image={
                <Image
                  src={imageSrc} 
                  alt={product.name}
                  width={200} 
                  height={200} 
                  className="product-thumb"
                />
              }
              name={product.name}
              rating={product.review}
              price={product.price}
              oldPrice={oldPrice}
            />
          );
        })}
      </div>
    </div>
  );
}
