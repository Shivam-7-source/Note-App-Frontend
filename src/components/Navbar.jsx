import React from "react";
import { BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* 🔹 Logo */}
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <BookOpen className="w-6 h-6 text-blue-500" />
          <span>NotesApp</span>
        </div>

        {/* 🔹 Links */}
        <div className="flex gap-4">
          <Link
            to="/"
            className={`px-3 py-1 rounded transition ${
              location.pathname === "/"
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            Home
          </Link>

          <Link
            to="/create"
            className={`px-3 py-1 rounded transition ${
              location.pathname === "/create"
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            Create
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;