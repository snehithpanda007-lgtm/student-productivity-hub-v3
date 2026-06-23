"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Tasks",
    href: "/tasks",
  },
  {
    name: "Notes",
    href: "/notes",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden bg-slate-900 text-white p-3 flex justify-around">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={
            pathname === link.href
              ? "font-bold text-blue-400"
              : ""
          }
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}