import React from "react";

const HumidityCard = ({ humidityValue }) => {
  return (
    <div className="flex items-center   px-2 py-2 rounded-lg space-x-1 ">
      <img
        src={"assets/images/humidity.png"}
        className="w-[32px] h-[32px]"
        alt={"humidity icon"}
      />
      <div className="flex flex-col">
        <span className="text-sm font-bold">{Math.round(humidityValue)} %</span>
      </div>
    </div>
  );
};

export default HumidityCard;
