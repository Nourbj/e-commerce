import Link from "next/link";

function FileAriane({ categoryName, categoryId }) {
  return (
    <div className="product-breadcrumb">
      <Link href="/">Home</Link>
      <span> / </span>
      <Link href={`/category/${categoryId}`}>{categoryName}</Link>
      <span> / </span>
    </div>
  );
}

export default FileAriane;