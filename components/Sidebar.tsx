"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    href: "/",
  },
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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-72 flex-col border-r border-gray-700 bg-gray-900 p-6">
      <h2 className="text-2xl font-bold text-white">
        Student Productivity Hub
      </h2>

      <nav className="mt-8">
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-xl px-4 py-3 text-base font-medium transition ${
                  pathname === link.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}