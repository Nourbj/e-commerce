import Image from 'next/image';

const BrandSection = () => {
  return (
    <div className="brands-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="brand-wrapper">
              <div className="brand-list">
                <Image
                  src="/img/brand1.png"
                  alt="Brand 1"
                  width={250}
                  height={100}
                  priority 
                  style={{ width: 'auto', height: 'auto' }}
                />
                <Image
                  src="/img/brand2.png"
                  alt="Brand 2"
                  width={250}
                  height={100}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <Image
                  src="/img/brand3.png"
                  alt="Brand 3"
                  width={250}
                  height={100}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <Image
                  src="/img/brand4.png"
                  alt="Brand 4"
                  width={250}
                  height={100}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <Image
                  src="/img/brand5.png"
                  alt="Brand 5"
                  width={250}
                  height={100}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <Image
                  src="/img/brand6.png"
                  alt="Brand 6"
                  width={250}
                  height={100}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <Image
                  src="/img/brand1.png"
                  alt="Brand 1 duplicate"
                  width={250}
                  height={100}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <Image
                  src="/img/brand2.png"
                  alt="Brand 2 duplicate"
                  width={250}
                  height={100}
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSection;