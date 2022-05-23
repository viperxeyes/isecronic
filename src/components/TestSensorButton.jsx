import React from "react";

const TestSensorButton = () => {
  return (
    <button
      onClick={() => {
        mainLightStatus
          ? client.publish("dia-room/mainLight/command", "off")
          : client.publish("dia-room/mainLight/command", "on");
      }}
      className="bg-slate-800 flex flex-col  items-center justify-center group space-y-5 hover:bg-slate-800/90 shadow-md hover:shadow-lg transition-all duration-300 ease-out rounded-lg px-5 py-2 min-w-fit w-[205px] min-h-fit h-[150px]"
    >
      <span>Main Light</span>
      <img
        src={
          mainLightStatus
            ? "assets/images/lightOn.png"
            : "assets/images/lightOff.png"
        }
        alt="main light"
        className="w-[90px] h-[90px] group-hover:w-[95px] group-hover:h-[95px]  transition-all duration-100 ease-out"
      />
    </button>
  );
};

export default TestSensorButton;
