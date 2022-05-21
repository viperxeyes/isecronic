import React from "react";

export default function ControlPanel() {
  return (
    <div className=" overflow-y-auto  flex-col flex flex-1  rounded-t-2xl  bg-slate-800/40 scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md ">
      <div className="bg-slate-800 w-56 h-10 flex dark:text-gray-100 items-center justify-between">
        <button className="flex justify-between items-center w-full hover:bg-gray-700 h-full border-r-2 border-transparent hover:border-gray-800 hover:border-opacity-50">
          <div className="ml-4">Dia Room</div>
          <i className="mr-4 fa fa-chevron-down fa-md"></i>
        </button>
      </div>
      <div className="flex flex-col px-2 py-2"> Control Panel</div>
    </div>
  );
}
