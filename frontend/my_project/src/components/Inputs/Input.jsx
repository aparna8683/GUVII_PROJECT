import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({
  value,
  onChange,
  label,
  type = "text",
  placeholder,
  error,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-medium">{label}</label>}
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className={`w-full border rounded px-3 py-2 ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={togglePassword}
          >
            {showPassword ? (
              <FaRegEye size={20} />
            ) : (
              <FaRegEyeSlash size={20} />
            )}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
