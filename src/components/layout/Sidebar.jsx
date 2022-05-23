import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ items }) {
  return (
    <div className=" flex flex-col lg:w-20 xl:w-28 shrink-0  bg-slate-800/20  rounded-tr-2xl     dark:text-white ">
      <div className="flex flex-col overflow-y-auto rounded-full   py-8 mt-6     ">
        <SideBarIcon icon="fa-layer-group" />

        <SideBarIcon />
        {items &&
          items.map((item, i) => {
            return <SideBarIcon key={i} icon={item.name} />;
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
        className={`${icon} fad  fa-lg relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-slate-800 text-blue-400 hover:bg-blue-600 hover:text-white rounded-3xl hover:rounded-xl transition-all duration-200 ease-linear `}
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
