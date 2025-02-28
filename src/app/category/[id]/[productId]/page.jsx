import OtherBrand from "@/Components/Server/OtherBrand";
import { getProductById } from "@/Services/Product";
import ProductDetailsClient from "./ProductDetails";
import FileAriane from "@/Components/Server/FileAriane";

export default async function ProductDetailsPage({ params }) {
  const { productId } = params;

  try {
    const product = await getProductById(productId);

    return (
      <div className="single-product-area">
        <div className="zigzag-bottom" />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="single-sidebar">
                <h2 className="sidebar-title">Recently Viewed</h2>
                <div className="thubmnail-recent">
                  <img src="/img/product-thumb-4.jpg" className="recent-thumb" alt="Product Thumbnail" />
                  <h2><a href="#">Sony Smart TV - 2015</a></h2>
                  <div className="product-sidebar-price">
                    <ins>700.00 €</ins> <del>100.00 €</del>
                  </div>
                </div>
                <div className="thubmnail-recent">
                  <img src="/img/product-thumb-3.jpg" className="recent-thumb" alt="Product Thumbnail" />
                  <h2><a href="#">Sony Smart TV - 2015</a></h2>
                  <div className="product-sidebar-price">
                    <ins>$700.00</ins> <del>$100.00</del>
                  </div>
                </div>
                <div className="thubmnail-recent">
                  <img src="/img/product-thumb-1.jpg" className="recent-thumb" alt="Product Thumbnail" />
                  <h2><a href="#">Sony Smart TV - 2015</a></h2>
                  <div className="product-sidebar-price">
                    <ins>$700.00</ins> <del>$100.00</del>
                  </div>
                </div>
                <div className="thubmnail-recent">
                  <img src="/img/product-thumb-2.jpg" className="recent-thumb" alt="Product Thumbnail" />
                  <h2><a href="#">Sony Smart TV - 2015</a></h2>
                  <div className="product-sidebar-price">
                    <ins>$700.00</ins> <del>$100.00</del>
                  </div>
                </div>
                <OtherBrand />
              </div>
            </div>
            <div className="col-md-8">
              <div className="product-content-right">
                <FileAriane />
                <div className="row">
                  <div className="col-sm-6">
                    <div className="product-images">
                      <div className="product-main-img">
                      <img
                          src={`/img/products-img/${product.categoryName || "default"}/${product.imageName || "default-image.png"}`}
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
