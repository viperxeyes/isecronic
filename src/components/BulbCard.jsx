import React from "react";

const BulbCard = () => {
  return (
    <div className="flex items-center bg-slate-800 w-[350px]   px-5 py-2 rounded-lg space-x-2 shadow-lg">
      <img src={"assets/images/humidity.png"} className="w-[64px] h-[64px]" />
      <div className="flex flex-col">
        <span className="text-2xl font-bold">
          Humidity : {Math.round(humidityValue)}
        </span>
      </div>
    </div>
  );
};

export default BulbCard;
