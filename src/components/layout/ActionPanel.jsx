import React from "react";

export default function ActionPanel() {
  return (
    <div className="bg-gray-800 ml-1  dark:text-gray-300 w-56 flex flex-col overflow-y-auto scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md items-center ">
      <button className="bg-gray-700  rounded-md h-8 w-40 px-4 hover:bg-gray-900 mt-2 flex items-center border-2 border-transparent focus:border-gray-400 transition-all ease-linear">
        <i className="fad fa-network-wired fa-lg mr-2 text-blue-400"></i>
        Gateways
      </button>

      <button className="bg-gray-700  rounded-md h-8 w-40 px-4 hover:bg-gray-900 mt-2 flex items-center border-2 border-transparent focus:border-gray-400 transition-all ease-linear">
        <i className="fad fa-microchip fa-lg mr-2 text-blue-400"></i>
        Controllers
      </button>

      <button className="bg-gray-700 align-middle rounded-md h-8 w-40 px-4 hover:bg-gray-900 mt-2 flex items-center border-2 border-transparent focus:border-gray-400 transition-all ease-linear">
        <i className="fad fa-sensor fa-lg mr-2 text-blue-400"></i>
        Sensors
      </button>
    </div>
  );
}
