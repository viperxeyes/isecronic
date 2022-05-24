import React from "react";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const MotionCard = ({ motionDetected }) => {
  return (
    <div
      className={`grid grid-cols-[1fr_2fr_1fr] items-center w-full   px-10 bg-slate-800   md:px-2   rounded-lg  shadow-lg`}
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
