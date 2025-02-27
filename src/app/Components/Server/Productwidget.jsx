import { getCategoryFromImage } from '@/app/Services/Category';
import ProductItem from './ProductItem';



export default function ProductWidget({ title, products }) {
  if (!products || products.length === 0) {
    return (
      <div className="col-md-4">
        <div className="single-product-widget">
          <h2 className="product-wid-title">{title}</h2>
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
          

            return (
              <ProductItem
                key={product.id}
                image={`/img/products-img/${category}/${product.imageName}`}
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
