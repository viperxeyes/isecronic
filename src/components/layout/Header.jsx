import React from "react";
import SearchBar from "components/SearchBar";
import UserPanel from "./UserPanel";

const Header = () => {
  return (
    <div className="flex space-x-4 h-32">
      <div className="[flex:0.125] ">
        <div className="w-28 items-center justify-center flex h-full">
          <img src="logo1.png" />
        </div>
      </div>
      <div className="[flex:0.25] flex items-center justify-center    ">
        <span className="text-5xl">iSecronic</span>
      </div>
      <div className="flex-1  my-auto">
        <SearchBar />
      </div>
      <div className="[flex:0.5] my-auto">
        <UserPanel />
      </div>
    </div>
  );
};

export default Header;
