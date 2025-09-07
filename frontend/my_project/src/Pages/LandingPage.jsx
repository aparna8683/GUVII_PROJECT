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

  // Dynamic logo & heading state
  const [logoText, setLogoText] = useState("Interview PREP AI");
  const [heroText, setHeroText] = useState("Ace Interviews with");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#FFF5E4] via-[#FFE5B4] to-[#FFD580] relative overflow-hidden">
      {/* Background gradient glow */}
      <div className="w-[500px] h-[500px] bg-orange-200/30 blur-[120px] absolute top-10 left-10 animate-pulse" />
      <div className="w-[400px] h-[400px] bg-pink-300/30 blur-[150px] absolute bottom-10 right-10 animate-pulse" />

      <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-[#FF6B00] to-[#FFB347] bg-clip-text text-transparent drop-shadow-md transition-all duration-500 hover:scale-110 cursor-pointer">
            {logoText}
          </div>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              onClick={() => setOpenAuthModal(true)}
              className="bg-gradient-to-r from-[#FF6B00] to-[#FF9A3D] text-sm font-semibold text-white px-7 py-2 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-500"
            >
              Login / Sign Up
            </button>
          )}
        </header>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Left */}
          <div className="w-full md:w-1/2 pr-4 mb-6 md:mb-0">
            <div className="flex items-center gap-2 text-[13px] text-orange-600 mb-3">
              <LucideSparkles className="w-5 h-5 animate-spin-slow" />
              <span>AI Powered</span>
            </div>
            <h1 className="text-5xl text-black font-bold mb-6 leading-tight drop-shadow-lg transition-all duration-500">
              {heroText} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFB347] animate-text-shimmer">
                AI-powered Learning
              </span>
            </h1>

            {/* Buttons to change hero/logo text */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setHeroText("Crack Your Dream Job with")}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow hover:scale-105 transition"
              >
                Change Hero Text
              </button>
              <button
                onClick={() => setLogoText("NextGen Career AI")}
                className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-600 text-white rounded-lg shadow hover:scale-105 transition"
              >
                Change Logo
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="w-full md:w-1/2">
            <p className="text-[18px] text-gray-800 md:text-[20px] mb-6">
              Get role-specific interview questions with detailed explanations.
              Practice smarter, not harder – powered by AI to match your pace
              and focus.
            </p>
            <button
              onClick={handleCTA}
              className="flex items-center gap-2 bg-gradient-to-r from-[#FF6B00] to-[#FFB347] text-sm font-semibold text-white px-7 py-3 rounded-xl shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-500"
            >
              <FaPlayCircle className="text-lg" />
              Start Preparing
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-[#FFF5E4] to-[#FFD580] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-[#FF6B00] to-[#FF9A3D] bg-clip-text text-transparent drop-shadow-lg">
            Features that make you shine
          </h2>

          {/* Features with 3D cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {APP_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="p-6 bg-white/80 rounded-2xl shadow-lg backdrop-blur-md hover:rotate-1 hover:-translate-y-2 hover:scale-105 transition-all duration-500"
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
