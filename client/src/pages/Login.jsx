import React, { useState } from "react";
import assets from "../assets/assets";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
    } else {
      console.log("Form submitted:", { name, email, password, bio });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Logo Section */}
        <div className="flex-shrink-0 text-center lg:text-left">
          <img
            src={assets.logo_big}
            className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 mx-auto lg:mx-0"
            alt="ZapChat Logo"
          />
          <div className="mt-4 lg:mt-6 hidden lg:block">
            <h1 className="text-2xl xl:text-3xl font-bold text-white mb-2">
              Welcome to ZapChat
            </h1>
            <p className="text-gray-300 text-sm xl:text-base">
              Connect with friends and family instantly
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md flex-shrink-0">
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md text-white border border-white/20 p-6 sm:p-8 flex flex-col gap-6 rounded-xl shadow-2xl"
          >
            <div className="text-center mb-2">
              <h2 className="font-bold text-2xl sm:text-3xl text-white mb-2">
                {currentState}
              </h2>
              <p className="text-gray-300 text-sm">
                {currentState === "Sign up"
                  ? "Create your account to get started"
                  : "Welcome back! Please sign in"}
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <div className="flex bg-white/5 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentState("Login");
                    setIsDataSubmitted(false);
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    currentState === "Login"
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentState("Sign up");
                    setIsDataSubmitted(false);
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    currentState === "Sign up"
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Sign up
                </button>
              </div>
            </div>

            {currentState === "Sign up" && !isDataSubmitted && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">
                  Full Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="w-full p-3 sm:p-4 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            {!isDataSubmitted && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-200">
                    Email Address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    className="w-full p-3 sm:p-4 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-200">
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    className="w-full p-3 sm:p-4 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </>
            )}

            {currentState === "Sign up" && isDataSubmitted && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200">
                  Bio
                </label>
                <textarea
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  rows={4}
                  className="w-full p-3 sm:p-4 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 resize-none transition-all duration-200"
                  placeholder="Tell us about yourself..."
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {currentState === "Sign up"
                ? isDataSubmitted
                  ? "Create Account"
                  : "Continue"
                : "Sign In"}
            </button>

            <div className="text-center">
              <p className="text-gray-300 text-sm">
                {currentState === "Sign up"
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <button
                  type="button"
                  className="text-purple-400 hover:text-purple-300 font-medium ml-1 transition-colors duration-200"
                  onClick={() => {
                    setCurrentState(
                      currentState === "Sign up" ? "Login" : "Sign up"
                    );
                    setIsDataSubmitted(false);
                  }}
                >
                  {currentState === "Sign up"
                    ? "Sign in here"
                    : "Create account"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
