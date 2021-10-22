import React from "react";

export default function Topbar() {
  return (
    <div className=" flex dark h-11 border-b-2 border-gray-850  ">
      <div className="bg-gray-800 w-56 flex dark:text-gray-100 items-center justify-between">
        <div className="ml-4">Control Title</div>
        <div className="mr-4">Chev</div>
      </div>
      <div className="bg-gray-700 w-56 flex flex-1 dark:text-gray-100 items-center justify-between">
        <div className="ml-4"># General</div>
      </div>
    </div>
  );
}
