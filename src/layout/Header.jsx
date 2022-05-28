import React from "react";
import SearchBar from "components/SearchBar";
import UserPanel from "./UserPanel";

const Header = () => {
  return (
    <div className="flex flex-col  lg:flex lg:flex-row lg:space-x-4 lg:h-32 lg:space-y-0 space-y-2">
      <div className="lg:[flex:0.125] ">
        <div className="flex justify-start space-x-3 px-2 lg:px-0 py-1   lg:flex-row   items-center lg:w-28 lg:items-center lg:justify-center  lg:h-full">
          <img src="/logo.png" alt="isecronic" className="w-20 lg:w-full " />
          <span className="[font-size:clamp(32px,5vw,40px)] lg:hidden">
            iSecronic
          </span>
        </div>
      </div>
      <div className="[flex:0.25] lg:[flex:0.24] lg:flex items-center justify-center hidden     ">
        <span className=" [font-size:clamp(32px,5vw,40px)]">iSecronic</span>
      </div>
      <div className="  flex-1 px-2 lg:px-0   flex justify-center items-center order-1 pb-5 lg:pb-0   lg:order-none">
        <SearchBar />
      </div>
      <div className="[flex:0.5]  px-2 lg:px-0  flex justify-center items-center ">
        <UserPanel />
      </div>
    </div>
  );
};

export default Header;
