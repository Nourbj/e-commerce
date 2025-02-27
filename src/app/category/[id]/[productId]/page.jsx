import OtherBrand from "@/Components/Server/OtherBrand";
import ProductDescription from "@/Components/Server/ProductDescription";
import ProductWidget from "@/Components/Server/Productwidget";
import { getProductById } from "@/Services/Product";

export default async function ProductDetailPage({ params }) {
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
                  <OtherBrand/>
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
                      <div className="product-inner">
                        <h2 className="product-name">{product.name}</h2>
                        <div className="product-inner-price">
                          <ins>{product.price} €</ins>
                          {product.oldPrice && <del>{product.oldPrice} €</del>}
                        </div>
                        <form className="cart">
                          <div className="quantity">
                            <input
                              type="number"
                              className="input-text qty text"
                              title="Qty"
                              defaultValue={1}
                              name="quantity"
                              min={1}
                              step={1}
                            />
                          </div>
                          <button className="btn btn-primary">
                            Add to Cart
                          </button>
                        </form>
                        <ProductDescription description={product.description} />
                      </div>
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
  