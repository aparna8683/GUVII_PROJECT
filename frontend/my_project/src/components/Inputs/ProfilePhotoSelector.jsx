import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);

      const preview = URL.createObjectURL(file);
      if (setPreview) setPreview(preview);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) setPreview(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Preview / Placeholder */}
      {!image ? (
        <div className="w-24 h-24 flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-full text-gray-400">
          <LuUser className="w-10 h-10" />
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="w-24 h-24 object-cover rounded-full border border-gray-300 shadow"
          />
        </div>
      )}

      {/* Upload Button */}
      {!image && (
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg shadow hover:bg-amber-600 transition"
        >
          <LuUpload className="w-5 h-5" /> Upload
        </button>
      )}

      {/* Remove Button */}
      {image && (
        <button
          type="button"
          onClick={handleRemoveImage}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          <LuTrash className="w-5 h-5" /> Remove
        </button>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
