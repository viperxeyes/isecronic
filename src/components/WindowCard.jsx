import React from "react";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const WindowCard = ({ windowOpen }) => {
  return (
    <div
      className={`flex items-center justify-between bg-slate-800 w-52  px-1 py-2 rounded-lg space-x-2 shadow-lg`}
    >
      <img
        alt={"gas icon"}
        src={`assets/images/window.png`}
        className={`w-[42px] h-[42px] ${windowOpen && "animate-bounce"} `}
      />
      <div className="flex flex-col">
        <span className="text-sm font-bold">Window&nbsp;</span>
        <span
          className={`text-sm font-bold ${
            windowOpen ? "text-red-500" : "text-green-500"
          }`}
        >
          {windowOpen ? "Window open" : "Window closed"}
        </span>
      </div>
      {windowOpen ? (
        <FaExclamationTriangle className="w-6 h-6 text-red-500   " />
      ) : (
        <FaCheckCircle className="w-6 h-6 text-green-400   " />
      )}
    </div>
  );
};

export default WindowCard;
