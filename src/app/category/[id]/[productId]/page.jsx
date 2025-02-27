// src/app/category/[id]/[productId]/page.jsx
import OtherBrand from "@/Components/Server/OtherBrand";
import ProductWidget from "@/Components/Server/Productwidget";
import { getProductById } from "@/Services/Product";
import ProductDetailsClient from "./ProductDetails";
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
                <ProductWidget title="Recently Viewed" showViewAllButton={false} showTitle={false} />
                <OtherBrand />
              </div>
            </div>
            <div className="col-md-8">
              <div className="product-content-right">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="product-images">
                      <div className="product-main-img">
                        <img
                          src={`/img/products-img/${product.imageName || "default-image.png"}`}
                          alt={product.name}
                        />
                      </div>
                      <div className="product-gallery">
                        <img src="/img/product-thumb-1.jpg" alt="" />
                        <img src="/img/product-thumb-2.jpg" alt="" />
                        <img src="/img/product-thumb-3.jpg" alt="" />
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
    return false;
  }
}