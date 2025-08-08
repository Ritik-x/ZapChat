import React from "react";
import assets from "../assets/assets";

const Rightside = ({ selectiveUser, setSelectiveUser }) => {
  return selectiveUser ? (
    <div className="w-full h-full bg-gradient-to-b from-white/5 to-white/10 border-l border-white/10 flex flex-col">
      <div className="p-4 sm:p-5 lg:p-6 h-full flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto min-h-0">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-white mb-1">Profile Info</h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4 mb-6">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={selectiveUser?.profilePic || assets.avatar_icon}
              alt={`${selectiveUser.fullName}'s profile`}
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover border-4 border-white/20 shadow-lg"
            />
            {/* Online Status Indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-800 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Name */}
          <div className="text-center">
            <h1 className="text-white text-lg sm:text-xl font-semibold mb-1">
              {selectiveUser.fullName}
            </h1>
            <p className="text-green-400 text-sm font-medium">Online</p>
          </div>

          {/* Bio */}
          {selectiveUser.bio && (
            <div className="bg-white/5 rounded-lg p-3 w-full">
              <p className="text-gray-300 text-sm text-center leading-relaxed">
                {selectiveUser.bio}
              </p>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="space-y-3">
          {/* Contact Info */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📧</span>
              </div>
              <h3 className="text-white text-sm font-medium">Contact Info</h3>
            </div>
            <p className="text-gray-400 text-xs ml-10 break-all">
              {selectiveUser.email || 'No email provided'}
            </p>
          </div>

          {/* Status Info */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🟢</span>
              </div>
              <h3 className="text-white text-sm font-medium">Status</h3>
            </div>
            <div className="ml-10">
              <p className="text-green-400 text-xs font-medium">Active now</p>
              <p className="text-gray-500 text-xs mt-1">Last seen recently</p>
            </div>
          </div>

          {/* Media & Files */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📁</span>
              </div>
              <h3 className="text-white text-sm font-medium">Media & Files</h3>
            </div>
            <p className="text-gray-400 text-xs ml-10">
              No shared media yet
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
              View Profile
            </button>
            <button className="w-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-200 border border-white/20">
              Mute Notifications
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Rightside;
