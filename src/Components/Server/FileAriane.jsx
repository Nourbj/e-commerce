"use client"; // Nécessaire pour utiliser les hooks dans App Router

import Link from "next/link";
import { useParams } from "next/navigation";

function FileAriane({ categoryName, product }) {
  const { id } = useParams(); // `id` correspond à la catégorie dans l'URL

  return (
    <div className="product-breadcrumb">
      <Link href="/">Home</Link>
      <span> / </span>
      <Link href={`/category/${id}`}>{categoryName}</Link>
    </div>
  );
}

export default FileAriane;