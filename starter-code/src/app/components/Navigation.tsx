"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUnlockAlt } from "react-icons/fa";

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
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>

            <Link
              href="/dashboard"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Dashboard
            </Link>

            <Link
              href="/auth"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sign In
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
