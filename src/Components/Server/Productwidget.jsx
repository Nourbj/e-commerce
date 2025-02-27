import { getCategoryFromImage } from '@/Services/Category';
import ProductItem from './ProductItem';
import Cookie from 'cookie-js';

export async function getServerSideProps(context) {
  // Retrieve recently viewed products from cookies on the server side
  const recentlyViewed = Cookie.get('recentlyViewed', context.req, context.res);

  // Parse the cookie data, if it exists; default to an empty array if no cookie
  const recentlyViewedProducts = recentlyViewed ? JSON.parse(recentlyViewed) : [];

  // Fetch additional product data if needed (e.g., product details from a DB or API)
  // You can add your logic here to fetch data based on recently viewed products

  return {
    props: {
      recentlyViewedProducts, // Pass the recently viewed products as a prop
    },
  };
}

export default function ProductWidget({ title, products, recentlyViewedProducts = [] }) {
  // If no products and the title is "Recently Viewed", show empty state
  if (title === "Recently Viewed" && recentlyViewedProducts.length === 0) {
    return (
      <div className="col-md-4">
        <div className="single-product-widget">
          <h2 className="product-wid-title">{title}</h2>
          <p>No recently viewed products.</p>
        </div>
      </div>
    );
  }

  // Use recentlyViewedProducts for the "Recently Viewed" section
  const displayProducts = title === "Recently Viewed" ? recentlyViewedProducts : products;

  return (
    <div className="col-md-4">
      <div className="single-product-widget">
        <h2 className="product-wid-title">{title}</h2>

        {displayProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          displayProducts.map((product) => {
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
          })
        )}
      </div>
    </div>
  );
}
