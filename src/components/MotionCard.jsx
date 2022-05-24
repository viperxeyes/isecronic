import React from "react";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const MotionCard = ({ motionDetected }) => {
  return (
    <div
      className={`flex items-center justify-between bg-slate-800 w-48  px-2 rounded-lg space-x-2 shadow-lg`}
    >
      <img
        alt={"gas icon"}
        src={
          motionDetected
            ? `assets/images/motion_on.png`
            : `assets/images/motion_off.png`
        }
        className={`w-[42px] h-[42px] ${motionDetected && "animate-bounce"} `}
      />
      <div className="flex flex-col">
        <span className="text-sm font-bold">Motion&nbsp;</span>
        <span
          className={`text-sm font-bold ${
            motionDetected ? "text-red-500" : "text-green-500"
          }`}
        >
          {motionDetected ? "Motion detected" : "No motion"}
        </span>
      </div>
      {motionDetected ? (
        <FaExclamationTriangle className="w-6 h-6 text-red-500   " />
      ) : (
        <FaCheckCircle className="w-6 h-6 text-green-400   " />
      )}
    </div>
  );
};

export default MotionCard;
