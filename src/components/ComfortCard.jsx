import React from "react";
import { BsSnow2 } from "react-icons/bs";
const ComfortCard = ({ comfortLevel }) => {
  return (
    <div className="flex space-x-1 px-1 items-center">
      <BsSnow2 className="w-6 h-6 text-slate-400" />
      <span> {comfortLevel}</span>
    </div>
  );
};

export default ComfortCard;
