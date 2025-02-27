function ProductShop({ image, name, rating, price, oldPrice }) {
  return (
    <div className="product-item">
      <div className="product-image">
        <img src={image} alt={name} className="img-fluid" />
      </div>
      <h3>{name}</h3>
      <div className="product-price">
        <ins>${price}</ins>
        {oldPrice && <del>${oldPrice}</del>}
      </div>
      <div className="product-add-to-cart">
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductShop;