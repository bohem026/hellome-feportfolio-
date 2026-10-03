"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Header.scss";

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "INDEX", href: "/" },
    { name: "WORKS", href: "/works" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT ASSISTANT", href: "/contact" },
    { name: "CMS CONSOLE", href: "/admin" },
  ];

  return (
    <header className="global-header">
      <div className="global-header__left">
        <Link href="/" className="logo">
          ARCH™
        </Link>
        <span className="sub-tag">
          ARCHIVE / EDITORIAL
          <br />
          SYS.REF 2026.09
        </span>
      </div>

      <nav className="global-header__nav">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive ? "active" : ""}`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="global-header__right">
        <span className="status-badge">● AVAILABLE FOR Q3/Q4</span>
        <div className="user-profile">
          <span className="avatar">JH</span>
        </div>
      </div>
    </header>
  );
}