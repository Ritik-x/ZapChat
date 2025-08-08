import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("Ritik");
  const [bio, setBio] = useState("Hello, I am using ZapChat");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, bio, selectedImage });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl backdrop-blur-xl bg-white/10 text-white border border-white/20 rounded-2xl shadow-2xl">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Profile Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center space-y-4">
              <label htmlFor="avatar" className="cursor-pointer group">
                <div className="relative">
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : "https://via.placeholder.com/100x100/6366f1/ffffff?text=Avatar"
                    }
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white/30 group-hover:border-white/50 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-sm font-medium">Change</span>
                  </div>
                </div>
                <input
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  type="file"
                  id="avatar"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-300">Click to upload profile image</p>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter your name"
              />
            </div>

            {/* Bio Input */}
            <div className="space-y-2">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-200">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
