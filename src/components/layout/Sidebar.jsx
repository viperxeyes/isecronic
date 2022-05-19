import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ items }) {
  return (
    <div className=" bg-gray-900 dark  w-20 flex-none flex flex-col min-h-screen h-screen  ">
      <div className=" overflow-y-auto flex flex-col  dark:text-white scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md">
        <SideBarIcon icon="fa-layer-group" />
        <SideBarIcon />
        {items &&
          items.map((item) => {
            return <SideBarIcon icon={item.name} />;
          })}

        {items && <SideBarIcon />}

        <SideBarIcon icon="fa-plus" />
      </div>
    </div>
  );
}

const SideBarIcon = ({ icon, image }) => {
  const navigate = useNavigate();
  const handleNavigate = (icon) => {
    if (icon === "fa-layer-group") {
      navigate("/dashboard");
    }
  };
  return icon ? (
    <button
      className="flex flex-row items-center group  "
      onClick={() => {
        handleNavigate(icon);
      }}
    >
      <div className=" group-hover:border-white border-l-4 border-transparent  group-hover:h-6 scale-y-75  h-3 transform transition-all rounded-r-lg  duration-200 ease-linear group-focus:border-white group-focus:h-12 "></div>
      <i
        className={`${icon} fad  fa-lg relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-gray-700 text-blue-400 hover:bg-blue-600 hover:text-white rounded-3xl hover:rounded-xl transition-all duration-200 ease-linear `}
      ></i>
    </button>
  ) : image ? (
    <img
      className={`relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-gray-700 text-green-500  hover:text-white rounded-3xl hover:rounded-xl transition-all duration-200 ease-linear `}
      src={image}
      width={5}
      height={5}
      alt="img"
    ></img>
  ) : (
    <i className=" border-b border-gray-700 mx-4"></i>
  );
};
