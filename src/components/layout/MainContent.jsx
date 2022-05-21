import React, { Suspense } from "react";
import routes from "routes";
import { Routes, Route } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
const MainContent = () => {
  const loading = () => {
    return <ClipLoader loading color="#3c88fa" />;
  };
  return (
    <div className="bg-gray-900 ml-2  dark:text-gray-200 pt-12 space-y-10 px-5 pb-5 flex-1 overflow-y-auto scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md ">
      <div className="flex items-center bg-slate-800/60 border-2 border-transparent focus-within:border-blue-500/50 rounded-xl px-2 transition-all duration-300 ease-out shadow-md">
        <FaSearch className="text-blue-500" />
        <input
          type={"search"}
          placeholder={"Search"}
          className={"w-full mx-auto bg-transparent px-2 py-2 outline-none "}
        />
      </div>
      <Suspense fallback={loading()}>
        <Routes>
          {routes.map((route, idx) => {
            return route.element ? (
              <Route
                key={idx}
                path={route.path}
                name={route.name}
                element={route.element}
              />
            ) : null;
          })}
        </Routes>
      </Suspense>
    </div>
  );
};

export default MainContent;
