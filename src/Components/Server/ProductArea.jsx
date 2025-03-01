import { getTopSellersProducts, getTopNewProducts } from '@/Services/Product';
import RecentlyViewed from '../Client/RecentlyView';
import ProductWidget from './ProductWidget/Productwidget';

export default async function ProductsArea() {
  const topSellersProducts = await getTopSellersProducts();
  const topNewProducts = await getTopNewProducts();

  return (
    <div className="product-widget-area">
      <div className="zigzag-bottom" />
      <div className="container">
        <div className="row">
          <ProductWidget title="Top Sellers" products={topSellersProducts} />

          <RecentlyViewed /> 

          <ProductWidget title="Top New" products={topNewProducts} />
        </div>
      </div>
    </div>
  );
}
