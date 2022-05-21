import React from "react";

const TemperatureCard = ({ temperatureValue, comfortLevel }) => {
  return (
    <div className="flex items-center   w-fit  px-2 py-2  ">
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
        className="w-[32px] h-[32px]"
      />
      <div className="flex space-x-2 ">
        <span className="text-sm font-bold">
          {Math.round(temperatureValue)} &deg; C
        </span>
      </div>
    </div>
  );
};

export default TemperatureCard;
