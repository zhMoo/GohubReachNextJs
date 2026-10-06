"use client";

// CLIENT component: needs the browser-only usePathname() hook to highlight
// the active link.

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/states", label: "States" },
  { href: "/regions/northern", label: "Regions", match: "/regions" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = ({ href, match }) => {
    const base = match ?? href;
    return base === "/" ? pathname === "/" : pathname === base || pathname.startsWith(`${base}/`);
  };

  return (
    <header className="navbar">
      <nav className="navbar-inner">
        <Link href="/" className="brand">
          🇲🇾 Jelajah Malaysia
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-link${isActive(l) ? " active" : ""}`}>
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
