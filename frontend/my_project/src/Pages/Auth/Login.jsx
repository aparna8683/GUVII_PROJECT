import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/userContext";
import Input from "../../components/Inputs/Input";

const LoginForm = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      } else {
        setError("No token received. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-[90vw] max-w-md mx-auto bg-gradient-to-br from-white/90 to-amber-50/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-amber-100">
      {/* Heading */}
      <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
        Welcome Back
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Please enter your details to login
      </p>

      {/* Error */}
      {error && (
        <p className="text-red-600 mb-4 text-sm font-medium text-center bg-red-100/70 p-2 rounded-lg shadow-inner">
          {error}
        </p>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        {/* Email */}
        <Input
          label="Email Address"
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-amber-200 bg-white/80 backdrop-blur rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        {/* Password */}
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-amber-200 bg-white/80 backdrop-blur rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-amber-500 to-orange-400 text-white font-semibold py-3 rounded-xl shadow-md hover:from-amber-600 hover:to-orange-500 hover:shadow-lg transition-all duration-300"
        >
          LOGIN
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm mt-6 text-center text-gray-700">
        Don&apos;t have an account?{" "}
        <span
          onClick={() => setCurrentPage("signup")}
          className="text-amber-600 cursor-pointer font-semibold hover:underline hover:text-orange-600 transition"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
