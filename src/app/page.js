import CustomCarousel from './Components/Client/CustomCarousel';
import BrandSection from './Components/Server/BrandSection'; 
import ProductsArea from './Components/Server/ProductArea';
import PromoSection from './Components/Server/PromoSection';

export default function Home() {
  
  return (
    <main>
      <CustomCarousel />
      <PromoSection />
      <BrandSection />
      <ProductsArea />
    </main>
  );
}
