import React from "react";

const GasCard = ({ gasValue }) => {
  return (
    <div className="flex items-center bg-slate-800 w-[350px]   px-5 py-2 rounded-lg space-x-2 shadow-lg">
      <img src="assets/images/poison.png" className="w-[64px] h-[64px]" />
      <div className="flex flex-col">
        <span
          className={`text-2xl font-bold ${
            gasValue <= 300
              ? "text-green-500"
              : gasValue > 300 && gasValue < 500
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {gasValue <= 300
            ? "Normal"
            : gasValue > 300 && gasValue < 500
            ? "Warning"
            : "Danger"}
        </span>
        <span className="text-2xl font-bold">Gas Level : {gasValue}</span>
      </div>
    </div>
  );
};

export default GasCard;
