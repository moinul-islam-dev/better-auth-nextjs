"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUnlockAlt } from "react-icons/fa";
import NavLinks from "./NavLink";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-white backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FaUnlockAlt className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Better-Auth Demo
            </span>
          </Link>

          <nav className="flex items-center space-x-6">
            <NavLinks />
          </nav>
        </div>
      </div>
    </header>
  );
}
