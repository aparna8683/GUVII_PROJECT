import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_FEATURES } from "../utils/data";
import { FaPlayCircle } from "react-icons/fa";
import { LucideSparkles } from "lucide-react";
import Modal from "../components/Modal";
import LoginPage from "../Pages/Auth/Login";
import SignUpPage from "../Pages/Auth/SignUp";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) setOpenAuthModal(true);
    else navigate("/dashboard");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#FFF5E4] via-[#FFE5B4] to-[#FFD580] relative overflow-hidden">
      {/* Background glow elements */}
      <div className="w-[500px] h-[500px] bg-orange-200/20 blur-[120px] absolute top-10 left-10 animate-pulse" />
      <div className="w-[400px] h-[400px] bg-pink-300/20 blur-[150px] absolute bottom-10 right-10 animate-pulse" />

      {/* Header */}
      <div className="container mx-auto px-4 pt-6 pb-[150px] relative z-10 flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#FF6B00] to-[#FFB347] bg-clip-text text-transparent cursor-pointer drop-shadow-md">
          Interview PREP AI
        </div>
        {user ? (
          <ProfileInfoCard />
        ) : (
          <button
            onClick={() => setOpenAuthModal(true)}
            className="bg-gradient-to-r from-[#FF6B00] to-[#FF9A3D] text-sm md:text-base font-semibold text-white px-6 md:px-8 py-2 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-500"
          >
            Login / Sign Up
          </button>
        )}
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 md:flex md:items-center md:justify-between mb-20">
        {/* Left */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <div className="flex items-center gap-2 text-orange-600 text-sm mb-3">
            <LucideSparkles className="w-5 h-5 animate-spin-slow" />
            <span>AI Powered</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight drop-shadow-lg">
            Ace Interviews with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFB347] animate-text-shimmer">
              AI-powered Learning
            </span>
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            Get role-specific interview questions with detailed explanations.
            Practice smarter, not harder – powered by AI to match your pace and
            focus.
          </p>
          <button
            onClick={handleCTA}
            className="flex items-center gap-2 bg-gradient-to-r from-[#FF6B00] to-[#FFB347] text-white text-sm md:text-base px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-500"
          >
            <FaPlayCircle className="text-lg" />
            Start Preparing
          </button>
        </div>

        {/* Right illustration or optional hero graphic */}
        <div className="md:w-1/2 flex justify-center items-center">
          {/* Optional illustration can go here */}
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-[#FFF5E4] to-[#FFD580]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-[#FF6B00] to-[#FF9A3D] bg-clip-text text-transparent drop-shadow-lg">
            Features that make you shine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {APP_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="p-6 bg-white/90 rounded-2xl shadow-lg backdrop-blur-md hover:scale-105 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-center gap-2 mb-4 text-orange-500">
                  <LucideSparkles className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-gray-600 text-sm">
        Made with ❤️ by <span className="font-bold">NextGen Career AI</span>.
        Level up your career 🚀
      </footer>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
        hideHeader
      >
        {currentPage === "login" ? (
          <LoginPage setCurrentPage={setCurrentPage} />
        ) : (
          <SignUpPage setCurrentPage={setCurrentPage} />
        )}
      </Modal>
    </div>
  );
};

export default LandingPage;
