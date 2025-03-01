import Link from 'next/link';
import Image from 'next/image';
import HeaderClient from './HeaderClient';

const HeaderServer = () => {
  return (
    <header className="header-area">
      <div className="container">
        <div className="row align-items-center d-flex justify-content-between">
          <div className="col-sm-7 d-flex align-items-center">
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
          
          <HeaderClient />
        </div>
      </div>
    </header>
  );
};

export default HeaderServer;
