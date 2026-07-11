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
    <nav className="border-t border-gray-700 bg-gray-900 px-4 py-3 md:hidden">
      <div className="flex items-center justify-around">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors duration-200 ${
              pathname === link.href
                ? "text-blue-400 font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}