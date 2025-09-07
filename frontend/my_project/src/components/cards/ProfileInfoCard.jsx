import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import defaultAvatar from "../../assets/avtar.png";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="flex items-center p-4 bg-white rounded-2xl shadow-lg border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Circular Avatar */}
      <div className="relative w-16 h-16">
        <img
          src={user.profileImageUrl || defaultAvatar}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border-2 border-amber-400 transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-ping"></span>
      </div>

      {/* User Info */}
      <div className="ml-4 flex-1">
        <h2 className="text-lg md:text-xl font-bold text-gray-900">
          {user.name || "User"}
        </h2>
        <p className="text-sm md:text-base text-gray-500">
          {user.email || "No email provided"}
        </p>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="ml-4 px-4 py-2 bg-amber-500 text-white text-sm font-semibold rounded-full shadow-md hover:bg-amber-600 hover:shadow-lg transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileInfoCard;
