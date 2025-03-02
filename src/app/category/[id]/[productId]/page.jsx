import OtherBrand from "@/Components/Server/OtherBrand";
import { getProductById } from "@/Services/Product";
import ProductDetailsClient from "./ProductDetails";
import FileAriane from "@/Components/Server/FileAriane";
import RecentlyViewed from "@/Components/Client/RecentlyView";
import { getCategoryFromImage } from "@/Services/Category";

export default async function ProductDetailsPage({ params }) {
  const { productId, id: categoryId } = await params;

  try {
    const product = await getProductById(productId);

    const category = getCategoryFromImage(product.imageName);
    const imagePath = `/img/products-img/${category}/${product.imageName}`;

    return (
      <div className="single-product-area">
        <div className="zigzag-bottom" />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="single-sidebar">
                <h2 className="sidebar-title">Recently Viewed</h2>
                <RecentlyViewed />
                <OtherBrand />
              </div>
            </div>
            <div className="col-md-8">
              <div className="product-content-right">
                <FileAriane categoryName={category} categoryId={categoryId} />
                <div className="row">
                  <div className="col-sm-6">
                    <div className="product-images">
                      <div className="product-main-img">
                        <img
                          key={product.id}
                          src={imagePath}
                          alt={product.name || "Product Image"}
                        />
                      </div>
                      <div className="product-gallery">
                        <img src="/img/product-thumb-1.jpg" alt="Product Thumbnail" />
                        <img src="/img/product-thumb-2.jpg" alt="Product Thumbnail" />
                        <img src="/img/product-thumb-3.jpg" alt="Product Thumbnail" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <ProductDetailsClient product={product} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="error-message">
        <p>Something went wrong while fetching the product details. Please try again later.</p>
      </div>
    );
  }
}