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
    <aside className="w-64 bg-slate-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">
        Productivity Hub
      </h2>

      <nav>
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-lg px-4 py-2 transition ${
                  pathname === link.href
                    ? "bg-blue-500"
                    : "hover:bg-slate-700"
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