import React from "react";

export default function Topbar() {
  return (
    <div className=" flex dark h-32 border-b-2 border-gray-800  ">
      <div className="bg-slate-900 w-56 flex flex-1 dark:text-gray-100 items-center ">
        <input type={"search"} placeholder="Search" className="w-2/3 mx-auto" />
      </div>
    </div>
  );
}
