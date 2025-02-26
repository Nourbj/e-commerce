export default function Navbar({ categories = [] }) {
  console.log("Catégories dans Navbar :", categories); 
  return (
    <div className="mainmenu-area">
      <div className="container">
        <div className="row">
          <div className="navbar">
            <ul className="nav navbar-nav navbar-expand">
              <li className="active">
                <a href="/">Home</a>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <a href={`/category/${category.id}`}>{category.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}