import Image from 'next/image';

function ProductItem({ image, alt, name, rating, price, oldPrice }) {
  const numericPrice = Number(price) || 0;
  const numericOldPrice =
    oldPrice !== null && oldPrice !== undefined ? Number(oldPrice) : null;

  return (
    <div className="single-wid-product">
      <Image
        src={image}
        alt={alt || name || 'Image produit'}
        width={200}
        height={200}
        className="product-thumb"
      />
      <h2>{name || "Produit sans nom"}</h2>
      <div className="product-wid-rating">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`fa fa-star ${i < (rating || 0) ? '' : 'text-muted'}`}
          />
        ))}
      </div>
      <div className="product-wid-price">
        <ins>${!isNaN(numericPrice) ? numericPrice.toFixed(2) : "0.00"}</ins>
        {numericOldPrice !== null &&
          !isNaN(numericOldPrice) && (
            <del>${numericOldPrice.toFixed(2)}</del>
          )}
      </div>
    </div>
  );
}

export default ProductItem;
