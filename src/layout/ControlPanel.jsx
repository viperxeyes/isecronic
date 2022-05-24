import React from "react";

export default function ControlPanel() {
  return (
    <div className="   rounded-t-2xl  bg-slate-800/40 overflow-hidden flex flex-col h-full   ">
      <div className="bg-slate-800 shrink-0  h-10 dark:text-gray-100 items-center justify-between">
        <button className="flex justify-between items-center w-full hover:bg-gray-700 h-full border-r-2 border-transparent hover:border-gray-800 hover:border-opacity-50">
          <div className="ml-4">Dia Room</div>
          <i className="mr-4 fa fa-chevron-down fa-md"></i>
        </button>
      </div>
      <div className="flex flex-col px-2 py-2  overflow-y-scroll   ">
        <span>All controls</span>
        <span>Turned on</span>
        <span>Turned off</span>
      </div>
    </div>
  );
}
