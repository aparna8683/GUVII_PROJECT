import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

// Dummy uploadImage (replace with your real uploader)
const uploadImage = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ imageUrl: URL.createObjectURL(file) }), 1000);
  });
};

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!fullName) return setError("Please enter full name.");
    if (!validateEmail(email))
      return setError("Please enter a valid email address.");
    if (!password) return setError("Please enter the password.");

    setError(null);
    setLoading(true);

    try {
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90vw] max-w-md mx-auto bg-gradient-to-br from-white/90 to-amber-50/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-amber-100">
      {/* Heading */}
      <h3 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
        Create Account
      </h3>
      <p className="text-gray-600 text-center mb-6">
        Sign up to unlock AI-powered interview prep
      </p>

      {/* Error */}
      {error && (
        <p className="text-red-600 mb-4 text-sm font-medium text-center bg-red-100/70 p-2 rounded-lg shadow-inner">
          {error}
        </p>
      )}

      <form onSubmit={handleSignUp} className="flex flex-col gap-5">
        {/* Profile Photo Selector */}
        <ProfilePhotoSelector
          image={profilePic}
          setImage={setProfilePic}
          preview={preview}
          setPreview={setPreview}
        />

        {/* Full Name */}
        <Input
          label="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border border-amber-200 bg-white/80 backdrop-blur rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        />

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-amber-200 bg-white/80 backdrop-blur rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        />

        {/* Password */}
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-amber-200 bg-white/80 backdrop-blur rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-gradient-to-r from-amber-500 to-orange-400 text-white font-semibold py-3 rounded-xl shadow-md hover:from-amber-600 hover:to-orange-500 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {/* Switch to login */}
      <p className="text-sm mt-6 text-center text-gray-700">
        Already have an account?{" "}
        <span
          onClick={() => setCurrentPage("login")}
          className="text-amber-600 cursor-pointer font-semibold hover:underline hover:text-orange-600 transition"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default SignUp;
