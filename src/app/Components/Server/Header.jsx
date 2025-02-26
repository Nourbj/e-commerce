import Image from 'next/image';
import Search from './Search';
import CartComponent from '../Client/CartComponent';


const Header = () => {
  return (
    <header className="header-area">
      <div className="container">
        <div className="row align-items-center d-flex justify-content-between">
          <div className="col-sm-4 d-flex align-items-center">
            <div className="logo">
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
