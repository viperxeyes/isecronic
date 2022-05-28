import React from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const AreaList = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/areas/new");
  };
  return (
    <div className=" flex-1 flex-col space-y-5">
      <button
        className="flex bg-slate-800 px-5 py-2 items-center space-x-2 justify-center rounded-md"
        onClick={handleNavigate}
      >
        <span>Add</span> <FaPlus />
      </button>
    </div>
  );
};

export default AreaList;
