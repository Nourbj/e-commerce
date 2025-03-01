import ViewAllButton from "../../Client/ViewAll";
import "./WidgetStyles.css"; 

export default function ProductWidget({ title, products = [] }) {
  return (
    <div className="widget-container">
      <h2 className="widget-title">{title}</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ViewAllButton products={products}  />
      )}
    </div>
  );
}