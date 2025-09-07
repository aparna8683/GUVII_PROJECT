import React from "react";
import ProfileInfoCard from "../cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="h-16 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8 h-full">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <h2 className="text-lg md:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400 transition-transform duration-300 group-hover:scale-105">
            AI Interview Prep
          </h2>
        </Link>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <ProfileInfoCard />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
