import Newsletter from "./Newsletter";
import MyStore from "./MyStore";

const Footer = ({ categories = [] }) => {
  console.log("Catégories dans Footer :", categories); // Vérifiez les données
  return (
    <div className="footer-top-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <MyStore />

          <div className="col-md-4 col-sm-6">
            <div className="footer-menu">
              <h2 className="footer-wid-title">Categories</h2>
              <ul>
                {/* Afficher les catégories dynamiquement */}
                {categories.map((category) => (
                  <li key={category.id}>
                    <a href={`/category/${category.id}`}>{category.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Footer;