import React from "react";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const GasCard = ({ gasValue, gasDetected }) => {
  return (
    <div
      className={`flex items-center justify-between bg-slate-800 w-fit  px-5 py-2 rounded-lg space-x-2 shadow-lg`}
    >
      <img
        src="assets/images/poison.png"
        className={`w-[32px] h-[32px] ${gasDetected && "animate-bounce"}`}
      />
      <div className="flex flex-col">
        <span
          className={`text-sm font-bold ${
            gasValue <= 350
              ? "text-green-500"
              : gasValue > 300 && gasValue < 800
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {gasValue <= 350
            ? "Normal"
            : gasValue > 300 && gasValue < 800
            ? "Warning"
            : "Danger"}
        </span>
        <span className="text-sm font-bold">Gas Level : {gasValue}</span>
      </div>
      {gasValue <= 350 ? (
        <FaCheckCircle className="w-6 h-6 text-green-400   " />
      ) : gasValue > 350 && gasValue < 800 ? (
        <FaExclamationCircle className="w-6 h-6 text-yellow-500   " />
      ) : (
        <FaExclamationTriangle className="w-6 h-6 text-red-500   " />
      )}
    </div>
  );
};

export default GasCard;
