import React from "react";
import assets, { userDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selectiveUser, setSelectiveUser }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-white/5 to-white/10 w-full h-full flex flex-col text-white border-r border-white/10">
      <div className="p-3 sm:p-4 lg:p-5 h-full flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="pb-4 sm:pb-5 border-b border-white/10">
          <div className="flex justify-between items-center mb-4">
            <img
              src={assets.logo}
              alt="ZapChat Logo"
              className="h-8 sm:h-10 w-auto"
            />

            <div className="relative group">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
                <img
                  src={assets.menu_icon}
                  alt="Menu"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </button>

              <div className="absolute top-full right-0 mt-2 z-20 w-40 bg-gray-800/95 backdrop-blur-md border border-white/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                  <hr className="my-2 border-white/20" />
                  <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors duration-200">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img
                src={assets.search_icon}
                alt="Search"
                className="w-4 h-4 text-gray-400"
              />
            </div>
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-sm placeholder-gray-400 transition-all duration-200"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto mt-4 min-h-0">
          <div className="space-y-1 pb-4">
            {userDummyData.map((user, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10 ${
                  selectiveUser?.id === user.id
                    ? "bg-white/15 border border-white/20"
                    : ""
                }`}
                onClick={() => setSelectiveUser(user)}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={user?.profilePic || assets.avatar_icon}
                    alt={`${user.fullName}'s profile`}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white/20"
                  />
                  {/* Online/Offline Status */}
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-gray-800 ${
                      index < 3 ? "bg-green-500" : "bg-gray-500"
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-medium text-white truncate">
                      {user.fullName}
                    </h3>
                    {index > 2 && (
                      <div className="flex-shrink-0 ml-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-purple-600 rounded-full">
                          {index}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs sm:text-sm text-gray-400 truncate">
                      {index < 3 ? "Online" : "Last seen recently"}
                    </p>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {index === 0
                        ? "now"
                        : index === 1
                        ? "2m"
                        : index === 2
                        ? "5m"
                        : "1h"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
