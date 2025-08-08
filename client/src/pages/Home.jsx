import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import Rightside from "../components/Rightside";

const Home = () => {
  const [selectiveUser, setSelectiveUser] = useState(null);
  
  return (
    <div className="w-full h-screen p-2 sm:p-4 lg:px-[8%] lg:py-[3%] xl:px-[12%] xl:py-[4%] overflow-hidden">
      <div
        className={`backdrop-blur-xl bg-white/5 border border-white/20 rounded-xl lg:rounded-2xl h-full grid transition-all duration-300 ${
          selectiveUser
            ? "grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[320px_1fr_280px] xl:grid-cols-[350px_1fr_320px]"
            : "grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]"
        }`}
      >
        {/* Sidebar */}
        <div className={`${selectiveUser ? 'hidden md:flex' : 'flex'} h-full overflow-hidden`}>
          <Sidebar
            selectiveUser={selectiveUser}
            setSelectiveUser={setSelectiveUser}
          />
        </div>

        {/* Chat Container */}
        <div className={`${!selectiveUser ? 'hidden md:flex' : 'flex'} h-full overflow-hidden`}>
          <ChatContainer
            selectiveUser={selectiveUser}
            setSelectiveUser={setSelectiveUser}
          />
        </div>

        {/* Right Side - Only show on larger screens when user is selected */}
        <div className={`${selectiveUser ? 'hidden lg:flex' : 'hidden'} h-full overflow-hidden`}>
          <Rightside
            selectiveUser={selectiveUser}
            setSelectiveUser={setSelectiveUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
