import React from "react";
import { FaCircle, FaDotCircle } from "react-icons/fa";
const ConnectionCard = ({ title, connectionStatus }) => {
  return (
    <div className="flex items-center bg-slate-800 w-full   px-5 py-2 rounded-lg space-x-2">
      {connectionStatus == "online" ? (
        <FaCircle className="w-[16px] h-[16px] text-green-500" />
      ) : (
        <FaDotCircle className="w-[16px] h-[16px] text-red-500" />
      )}

      <div className="flex flex-col">
        <span className="text-sm ">
          {title}{" "}
          {connectionStatus &&
            (connectionStatus = connectionStatus.replace(
              /(\w)(\w*)/g,
              function (g0, g1, g2) {
                return g1.toUpperCase() + g2.toLowerCase();
              }
            ))}
        </span>
      </div>
    </div>
  );
};

export default ConnectionCard;
