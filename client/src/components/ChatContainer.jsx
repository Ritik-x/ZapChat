import React, { useEffect, useRef, useState } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/Utils";

const ChatContainer = ({ selectiveUser, setSelectiveUser }) => {
  const scrollEnd = useRef();
  const [message, setMessage] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // AI Translation/Improvement function (placeholder for Gemini API)
  const handleAIImprove = () => {
    if (!message.trim()) return;

    setIsTranslating(true);

    // Placeholder - Gemini API integration will be added here later
    setTimeout(() => {
      alert("AI Improve button clicked! Gemini API integration pending.");
      setIsTranslating(false);
    }, 1000);
  };

  return selectiveUser ? (
    <div className="h-full flex flex-col bg-gradient-to-b from-white/5 to-transparent overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 sm:p-4 border-b border-white/10 bg-white/5">
        <button
          onClick={() => setSelectiveUser(null)}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
        >
          <img
            src={assets.arrow_icon}
            alt="Back"
            className="w-5 h-5 rotate-180"
          />
        </button>

        <div className="relative flex-shrink-0">
          <img
            src={selectiveUser?.profilePic || assets.avatar_icon}
            alt={`${selectiveUser?.fullName}'s profile`}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white/20"
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 rounded-full border-2 border-gray-800" />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-white truncate">
            {selectiveUser?.fullName || "Unknown User"}
          </h2>
          <p className="text-xs sm:text-sm text-green-400">Online</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden sm:block p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
            <img
              src={assets.help_icon}
              alt="More options"
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {messagesDummyData.map((message, index) => {
          const isCurrentUser = message.senderId === "680f7077dccf9";

          return (
            <div
              key={index}
              className={`flex gap-2 sm:gap-3 ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              {/* Profile picture for received messages */}
              {!isCurrentUser && (
                <div className="flex-shrink-0">
                  <img
                    src={selectiveUser?.profilePic || assets.avatar_icon}
                    alt="profile"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                  />
                </div>
              )}

              {/* Message content */}
              <div
                className={`flex flex-col max-w-[75%] sm:max-w-xs lg:max-w-md ${
                  isCurrentUser ? "items-end" : "items-start"
                }`}
              >
                {/* Message bubble */}
                <div
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-sm ${
                    isCurrentUser
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md"
                      : "bg-white/10 backdrop-blur-sm text-white rounded-bl-md border border-white/20"
                  }`}
                >
                  {message.image ? (
                    <img
                      src={message.image}
                      alt="message image"
                      className="max-w-full h-auto rounded-lg"
                    />
                  ) : (
                    <p className="text-sm sm:text-base leading-relaxed break-words">
                      {message.text}
                    </p>
                  )}
                </div>

                {/* Timestamp */}
                <span className="text-xs text-gray-400 mt-1 px-1">
                  {formatMessageTime(message.createdAt)}
                </span>
              </div>

              {/* Profile picture for sent messages */}
              {isCurrentUser && (
                <div className="flex-shrink-0">
                  <img
                    src={assets.avatar_icon}
                    alt="your profile"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* Message Input Area */}
      <div className="p-3 sm:p-4 border-t border-white/10 bg-white/5">
        <div className="flex items-end gap-2 sm:gap-3">
          {/* AI Improve Button */}
          <button
            onClick={handleAIImprove}
            disabled={!message.trim() || isTranslating}
            className={`flex-shrink-0 p-2 sm:p-2.5 rounded-lg transition-all duration-200 ${
              message.trim() && !isTranslating
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md transform hover:scale-105"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
            title="AI Improve Text (Translate Hindi to English or improve English)"
          >
            {isTranslating ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-xs sm:text-sm font-bold">AI</span>
            )}
          </button>

          {/* Message Input Container */}
          <div className="flex-1 flex items-end gap-2 bg-white/10 backdrop-blur-sm rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 border border-white/20">
            <div className="flex-1">
              <textarea
                onChange={(e) => {
                  setMessage(e.target.value);
                  // Auto-resize textarea
                  e.target.style.height = "auto";
                  e.target.style.height =
                    Math.min(e.target.scrollHeight, 120) + "px";
                }}
                value={message}
                placeholder="Type a message..."
                className="w-full bg-transparent border-none outline-none text-white text-sm sm:text-base placeholder:text-gray-400 resize-none max-h-[120px] min-h-[20px]"
                rows={1}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && message.trim()) {
                    e.preventDefault();
                    console.log("Sending message:", message);
                    setMessage("");
                    e.target.style.height = "auto";
                  }
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="file" id="file" accept="image/*" hidden />
              <label
                htmlFor="file"
                className="cursor-pointer p-1 hover:bg-white/10 rounded transition-colors duration-200"
              >
                <img
                  src={assets.gallery_icon}
                  alt="Attach image"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </label>
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={() => {
              if (message.trim()) {
                console.log("Sending message:", message);
                setMessage("");
                // Reset textarea height
                const textarea = document.querySelector("textarea");
                if (textarea) textarea.style.height = "auto";
              }
            }}
            disabled={!message.trim()}
            className={`flex-shrink-0 p-2 sm:p-2.5 rounded-full transition-all duration-200 ${
              message.trim()
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md transform hover:scale-105 active:scale-95"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            <img
              src={assets.send_button}
              alt="Send message"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-purple-900/10 to-blue-900/10">
      <div className="text-center p-6 sm:p-8 max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              💬
            </span>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Welcome to ZapChat
        </h2>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          Select a conversation from the sidebar to start chatting with your
          friends and family.
        </p>
        <div className="mt-6 text-xs text-gray-500">
          <p>✨ AI-powered translation available</p>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
