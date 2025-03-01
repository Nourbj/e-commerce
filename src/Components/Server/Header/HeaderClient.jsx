// components/Client/HeaderClient.js
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Utilisation de usePathname pour obtenir l'URL
import Search from '@/Components/Client/Search';
import CartComponent from '@/Components/Client/CartComponent';

const HeaderClient = () => {
  const pathname = usePathname(); // Récupère l'URL actuelle
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    if (pathname.includes('/cart') || pathname.includes('/checkout')) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  }, [pathname]); // Le hook se déclenche à chaque changement d'URL

  return (
    <div className="col-sm-4 d-flex justify-content-center">
      {showSearch && <Search/>}
      <CartComponent/>
    </div>
  );
};

export default HeaderClient;
