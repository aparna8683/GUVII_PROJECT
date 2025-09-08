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
    <div className="flex items-center gap-3">
      {/* Circular Avatar */}
      <div className="relative w-14 h-14">
        <img
          src={user.profileImageUrl || defaultAvatar}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border-2 border-amber-400 shadow transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-ping"></span>
      </div>

      {/* Name & Email */}
      <div className="flex flex-col">
        <h2 className="text-base md:text-lg font-bold text-black">
          {user.name || "User"}
        </h2>
        <p className="text-xs md:text-sm text-gray-600">
          {user.email || "No email provided"}
        </p>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="ml-4 px-3 py-1.5 bg-amber-500 text-white text-xs md:text-sm font-semibold rounded-full shadow hover:bg-amber-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileInfoCard;
