import React from "react";

export default function Topbar() {
  return (
    <div className=" flex dark h-11 border-b-2 border-gray-800  ">
      <div className="bg-gray-800 w-56 flex dark:text-gray-100 items-center justify-between">
        <button className="flex justify-between items-center w-full hover:bg-gray-700 h-full border-r-2 border-transparent hover:border-gray-800 hover:border-opacity-50">
          <div className="ml-4">Dia Room</div>
          <i className="mr-4 fa fa-chevron-down fa-md"></i>
        </button>
      </div>
      <div className="bg-gray-700 w-56 flex flex-1 dark:text-gray-100 items-center justify-between">
        <div className="ml-4"># General</div>
      </div>
    </div>
  );
}
