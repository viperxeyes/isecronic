import React from "react";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const SensorInputCard = ({ analogValue, isTriggered, variant }) => {
  return (
    <div
      className={`flex flex-col justify-between pt-4 pb-2 items-center w-full overflow-hidden   h-22   px-3 bg-slate-800   md:px-2   rounded-lg  shadow-lg`}
    >
      <div className="flex items-center justify-between w-full">
        <img
          alt={`${variant} icon`}
          src={
            isTriggered
              ? `assets/images/${variant}_on.png`
              : `assets/images/${variant}_off.png`
          }
          className={`w-[48px] h-[48px] ${isTriggered && "animate-bounce"} `}
        />
        {variant === "gas" ? (
          <div className="">
            <span className="[font-size:clamp(8px,4vw,14px)] font-bold whitespace-nowrap">
              Gas &nbsp;
              {analogValue.length === 1 ? (
                <> {analogValue}&nbsp;&nbsp;&nbsp;</>
              ) : analogValue.length === 2 ? (
                <> {analogValue}&nbsp;&nbsp;</>
              ) : analogValue.length === 3 ? (
                <>
                  {analogValue}
                  &nbsp;
                </>
              ) : (
                analogValue
              )}
            </span>
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <span className="font-bold">
                {variant.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
                  return g1.toUpperCase() + g2.toLowerCase();
                })}
                &nbsp;
              </span>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-between w-full">
        <span
          className={`text-sm font-bold ${
            isTriggered ? "text-red-500" : "text-green-500"
          }`}
        >
          {variant === "gas" && (
            <span
              className={`text-sm font-bold ${
                analogValue <= 350
                  ? "text-green-500"
                  : analogValue > 300 && analogValue < 800
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {analogValue <= 350
                ? "Normal"
                : analogValue > 300 && analogValue < 800
                ? "Warning"
                : "Danger"}
            </span>
          )}

          {variant === "motion" && isTriggered
            ? "Detected"
            : variant === "motion" && !isTriggered
            ? "No motion"
            : null}
          {variant === "alarm" && isTriggered
            ? "Detected"
            : variant === "alarm" && !isTriggered
            ? "No alarm"
            : null}
          {variant === "window" && isTriggered
            ? "Warning"
            : variant === "window" && !isTriggered
            ? "Safe"
            : null}
        </span>
        {variant === "gas" ? (
          <>
            {analogValue <= 350 ? (
              <FaCheckCircle className="w-6 h-6 text-green-400   " />
            ) : analogValue > 350 && analogValue < 800 ? (
              <FaExclamationCircle className="w-6 h-6 text-yellow-500   " />
            ) : (
              <FaExclamationTriangle className="w-6 h-6 text-red-500   " />
            )}
          </>
        ) : (
          <>
            {isTriggered ? (
              <FaExclamationTriangle className="w-6 h-6 text-red-500   " />
            ) : (
              <FaCheckCircle className="w-6 h-6 text-green-400   " />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SensorInputCard;
