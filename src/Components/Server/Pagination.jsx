import Link from "next/link";

const Pagination = ({ productsPerPage, totalProducts, currentPage, categoryId }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <Link href={`/category/${categoryId}?page=${currentPage - 1}`} className="page-link" tabIndex="-1">Previous</Link>
            </li>
            {pageNumbers.map(number => (
              <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                <Link href={`/category/${categoryId}?page=${number}`} className="page-link">
                  {number}
                </Link>
              </li>
            ))}
            <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
              <Link href={`/category/${categoryId}?page=${currentPage + 1}`} className="page-link">Next</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;