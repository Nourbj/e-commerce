import Link from 'next/link';  

const CartComponent = () => {
  return (
    <div className="col-sm-4">
      <div className="shopping-item">
        <Link href="/cart"> 
          Cart : <span className="cart-amunt">100.58 €</span>
          <i className="fa fa-shopping-cart"></i>
          <span className="product-count">5</span>
        </Link>
      </div>
    </div>
  );
};

export default CartComponent;
