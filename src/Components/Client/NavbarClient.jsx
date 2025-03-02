"use client"; 

import Link from "next/link";
import { usePathname } from "next/navigation"; // Use the usePathname hook

export default function NavbarClient({ categories = [] }) {
  const pathname = usePathname(); 

  const hideNavbar = pathname.includes("/cart") || pathname.includes("/checkout");

  if (hideNavbar) {
    return null; 
  }

  return (
    <div className="mainmenu-area">
      <div className="container">
        <div className="row">
          <div className="navbar">
            <ul className="nav navbar-nav navbar-expand">
              <li className="active">
                <Link href="/">Home</Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.id}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}