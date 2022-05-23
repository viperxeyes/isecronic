import React from "react";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import AccountButton from "./AccountButton";
const UserPanel = () => {
  return (
    <div className="flex  w-full space-x-4 justify-between px-10">
      <div className="flex space-x-5">
        <button className="bg-slate-800 rounded-lg w-12 h-12 flex items-center justify-center group">
          <FaRegBell className="text-blue-500 w-6 h-6  group-hover:animate-pulse group-hover:text-slate-300 transition-all duration-300 ease-out " />
        </button>
        <button className="bg-slate-800 rounded-lg w-12 h-12 flex items-center justify-center  group">
          <AiOutlineSetting className="text-blue-500  w-6 h-6 group-hover:rotate-90 group-hover:text-slate-300 transition-all duration-300 ease-out" />
        </button>
      </div>

      <AccountButton />
    </div>
  );
};

export default UserPanel;
