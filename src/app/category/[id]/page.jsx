import CategoryTitle from "@/Components/Server/CategoryTitle";
import Pagination from "@/Components/Server/Pagination";
import ProductShop from "@/Components/Server/ProductShop";
import { getProductsByCategory } from "@/Services/Product";
import Link from "next/link";

export default async function CategoryPage({ params, searchParams }) {
  const { id } = await params;
  const currentPage = parseInt(await searchParams.page) || 1;

  try {
    const { categoryName, products } = await getProductsByCategory(id);

    const productsPerPage = 6; // 2 rows of 3 products each
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
      <div>
        <CategoryTitle categoryTitle={categoryName} />
        <div className="single-product-area">
          <div className="zigzag-bottom"></div>
          <div className="container">
            <div className="row">
              {currentProducts.map((product) => {
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
            <div className="pagination-container" style={{ marginTop: '20px' }}>
              <Pagination
                productsPerPage={productsPerPage}
                totalProducts={products.length}
                currentPage={currentPage}
                categoryId={id}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Error loading products. Please try again later.</div>;
  }
}