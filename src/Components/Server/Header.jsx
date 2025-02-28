import Image from 'next/image';
import CartComponent from '../Client/CartComponent';
import Link from 'next/link';
import Search from '../Client/Search';


const Header = () => {
  return (
    <header className="header-area">
      <div className="container">
        <div className="row align-items-center d-flex justify-content-between">
          <div className="col-sm-4 d-flex align-items-center">
            <div className="logo">
            <Link href="/">
                <h1>
                  <Image 
                    src="/img/logo.png" 
                    alt="Logo" 
                    className="img-fluid" 
                    width={150}  
                    height={50}  
                    priority 
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </h1>
              </Link>
            </div>
          </div>
          <div className="col-sm-0 d-flex justify-content-center">
            <Search />
          </div>
         <CartComponent />
        </div>
      </div>
    </header>
  );
};

export default Header;
