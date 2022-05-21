import React from "react";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import AccountButton from "./AccountButton";
export default function ActionPanel() {
  return (
    <div className="bg-gray-900 pl-5   dark:text-slate-300 w-1/3 flex flex-col overflow-y-auto scrollbar-thumb-slate-500 scrollbar-track-slate-100 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md items-center ">
      <div className="flex  w-full pt-12 pb-9 space-x-4 justify-between px-10">
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
      <div className="   shadow-xl   bg-black/20 w-full flex-1 flex flex-col items-center  rounded-tl-2xl">
        {/* <button className="bg-slate-700  rounded-md h-8 w-40 px-4 hover:bg-slate-900 mt-2 flex items-center border-2 border-transparent focus:border-slate-400 transition-all ease-linear">
          <i className="fad fa-network-wired fa-lg mr-2 text-blue-400"></i>
          Gateways
        </button>

        <button className="bg-slate-700  rounded-md h-8 w-40 px-4 hover:bg-slate-900 mt-2 flex items-center border-2 border-transparent focus:border-slate-400 transition-all ease-linear">
          <i className="fad fa-microchip fa-lg mr-2 text-blue-400"></i>
          Controllers
        </button>

        <button className="bg-slate-700 align-middle rounded-md h-8 w-40 px-4 hover:bg-slate-900 mt-2 flex items-center border-2 border-transparent focus:border-slate-400 transition-all ease-linear">
          <i className="fad fa-sensor fa-lg mr-2 text-blue-400"></i>
          Sensors
        </button> */}
      </div>
    </div>
  );
}
