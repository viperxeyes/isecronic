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
    <div className="  text-gray-200  space-y-8 flex flex-1 overflow-y-hidden   ">
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
