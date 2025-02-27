import CategoryTitle from "@/Components/Server/CategoryTitle";
import ProductShop from "@/Components/Server/ProductShop";
import { getProductsByCategory } from "@/Services/Product";
import Link from "next/link";

export default async function CategoryPage({ params }) {
  const { id } = params || {};

  try {
    const { categoryName, products } = await getProductsByCategory(id);
   

    return (
      <div>
        <CategoryTitle categoryTitle={categoryName} />
        <div className="single-product-area">
          <div className="zigzag-bottom"></div>
          <div className="container">
            <div className="row">
              {products.map((product) => {
                if (!product.id) {
                  return null;
                }

                const imageUrl = product.imageName
                  ? `/img/products-img/${categoryName}/${product.imageName}`
                  : '/img/no-image-available.png';

                const priceAfterDiscount = product.price * (1 - (product.discountRate / 100));

                return (
                  <div key={product.id} className="col-md-4">
                    <Link href={`/category/${id}/${product.id}`} passHref>
                    <ProductShop
                        id={product.id}
                        image={imageUrl}
                        name={product.name}
                        rating={product.review}
                        price={priceAfterDiscount.toFixed(2)}
                        oldPrice={product.price.toFixed(2)}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return false;
  }
}