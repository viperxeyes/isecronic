import React from "react";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const AlarmCard = ({ alarmDetected }) => {
  return (
    <div
      className={`flex items-center justify-between bg-slate-800 w-52  px-1 py-2 rounded-lg space-x-2 shadow-lg`}
    >
      <img
        alt={"gas icon"}
        src={
          alarmDetected
            ? `assets/images/alarm2_on.png`
            : `assets/images/alarm2_off.png`
        }
        className={`w-[42px] h-[42px] ${alarmDetected && "animate-bounce"} `}
      />
      <div className="flex flex-col">
        <span className="text-sm font-bold">Alarm&nbsp;</span>
        <span
          className={`text-sm font-bold ${
            alarmDetected ? "text-red-500" : "text-green-500"
          }`}
        >
          {alarmDetected ? "Alarm" : "No alarm"}
        </span>
      </div>
      {alarmDetected ? (
        <FaExclamationTriangle className="w-6 h-6 text-red-500   " />
      ) : (
        <FaCheckCircle className="w-6 h-6 text-green-400   " />
      )}
    </div>
  );
};

export default AlarmCard;
