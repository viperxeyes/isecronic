import SensorOutputButton from "components/SensorOutputButton";
import React from "react";
import { FaChevronCircleDown } from "react-icons/fa";
export default function ActionPanel() {
  const sensors = [
    { name: "Air Condition", type: "air_condition", id: "1" },
    {
      name: "Refrigerator",
      type: "refrigerator",
      id: "2",
      status: true,
    },
    { name: "Main Door", type: "door", id: "3" },
    { name: "Sound System", type: "sound_system", id: "4" },
    { name: "Gas Valve", type: "valve", id: "5", status: true },
    { name: "Router", type: "router", id: "6", status: true },
  ];

  return (
    <div className="bg-gray-900 w-full  dark:text-slate-300  flex flex-col overflow-y-auto  items-center ">
      <div className="   shadow-xl relative   bg-slate-800/20 w-full flex-1  items-center  rounded-tl-2xl">
        <div className="  grid grid-cols-2 place-items-center h-[345px] px-2 py-2   overflow-y-scroll gap-5 mx-auto my-5 w-fit">
          {sensors.map((sensor) => (
            <SensorOutputButton key={sensor.id} sensor={sensor} />
          ))}
          {sensors.length > 6 && (
            <div className="absolute  animate-bounce bottom-1/2  rounded-full flex items-center justify-center ">
              <FaChevronCircleDown className="w-8 h-8 text-slate-400 " />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
