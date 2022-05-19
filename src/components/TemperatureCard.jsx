import React from "react";

const TemperatureCard = ({ temperatureValue, comfortLevel }) => {
  return (
    <div className="flex items-center bg-slate-800 w-[350px]   px-5 py-2 rounded-lg space-x-2 shadow-lg">
      <img
        src={
          temperatureValue >= 0 && temperatureValue <= 15
            ? "assets/images/tempFreezing.png"
            : temperatureValue > 15 && temperatureValue <= 27
            ? "assets/images/tempCool.png"
            : temperatureValue > 27 && temperatureValue <= 33
            ? "assets/images/tempWarm.png"
            : temperatureValue > 33 && temperatureValue <= 40
            ? "assets/images/tempHoy.png"
            : "assets/images/tempBlazing.png"
        }
        className="w-[64px] h-[64px]"
      />
      <div className="flex flex-col">
        <span className={`text-2xl font-bold`}>Comfort {comfortLevel}</span>
        <span className="text-2xl font-bold">
          Temperature : {Math.round(temperatureValue)} &deg; C
        </span>
      </div>
    </div>
  );
};

export default TemperatureCard;
