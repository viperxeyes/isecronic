import React from "react";
import { FaSearch } from "react-icons/fa";
const SearchBar = () => {
  return (
    <div className="flex items-center min-w-fit w-1/2  bg-slate-800/60 border-2 border-transparent focus-within:border-blue-500/50 rounded-xl px-2 transition-all duration-300 ease-out shadow-md">
      <FaSearch className="text-blue-500" />
      <input
        type={"search"}
        placeholder={"Search"}
        className={"w-full mx-auto bg-transparent px-2 py-2 outline-none "}
      />
    </div>
  );
};

export default SearchBar;
