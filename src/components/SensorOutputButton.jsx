import React, { useState, useEffect, useCallback } from "react";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { MdRouter, MdTv, MdSurroundSound, MdSensorDoor } from "react-icons/md";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa";

const SensorOutputButton = ({ sensor, variant, client }) => {
  const { status } = sensor;

  const [color, setColor] = useState("bg-slate-800");
  const getColorBasedOnType = useCallback(() => {
    if (sensor.type.toLowerCase() === "air_condition") {
      !variant && setColor("bg-green-500");
    }
    if (sensor.type.toLowerCase() === "router") {
      !variant && setColor("bg-red-500");
    }
    if (sensor.type.toLowerCase() === "tv") {
      !variant && setColor("bg-green-500");
    }
    if (sensor.type.toLowerCase() === "sound_system") {
      !variant && setColor("bg-orange-500");
    }
    if (sensor.type.toLowerCase() === "refrigerator") {
      !variant && setColor("bg-purple-500");
    }
    if (sensor.type.toLowerCase() === "door") {
      !variant && setColor("bg-blue-500");
    }
    if (sensor.type.toLowerCase() === "valve") {
      !variant && setColor("bg-gray-500");
    }
    if (sensor.type.toLowerCase() === "bulb") {
      !variant && setColor("bg-slate-800");
    }
    if (sensor.type.toLowerCase() === "fan") {
      !variant && setColor("bg-slate-800");
    }
  }, [sensor.type, variant]);

  const getSensorIconBasedOnType = (type, size) => {
    if (sensor.type.toLowerCase() === "refrigerator") {
      return <CgSmartHomeRefrigerator className={`${size}`} />;
    }
    if (sensor.type.toLowerCase() === "router") {
      return <MdRouter className={`${size}`} />;
    }
    if (sensor.type.toLowerCase() === "tv") {
      return <MdTv className={`${size}`} />;
    }
    if (sensor.type.toLowerCase() === "sound_system") {
      return <MdSurroundSound className={`${size}`} />;
    }
    if (sensor.type.toLowerCase() === "door") {
      return <MdSensorDoor className={`${size}`} />;
    }
    if (sensor.type.toLowerCase() === "valve") {
      return (
        <img src="assets/images/valve.png" alt="valve" className={`${size}`} />
      );
    }
    if (sensor.type.toLowerCase() === "air_condition") {
      return (
        <img
          src="assets/images/air_condition.png"
          alt="air condition"
          className={`${size}`}
        />
      );
    }
    if (sensor.type.toLowerCase() === "fan") {
      return (
        <img
          src="assets/images/fan.png"
          alt="fan"
          className={`${size}  ${status && "animate-spin "}`}
        />
      );
    }

    if (sensor.type.toLowerCase() === "bulb") {
      if (status) {
        return <FaLightbulb className={`${size}`} />;
      } else {
        return <FaRegLightbulb className={`${size}`} />;
      }
    }
  };

  useEffect(() => {
    getColorBasedOnType();
  }, [getColorBasedOnType]);
  return (
    <button
      className={`  ${color} px-5 flex flex-col justify-between rounded-lg ${
        variant ? " h-28" : " h-24"
      }   py-4 w-full text-white`}
      onClick={() => {
        status
          ? client.publish(`${sensor.controller}/${sensor.topic}`, "off")
          : client.publish(`${sensor.controller}/${sensor.topic}`, "on");
      }}
    >
      <div className="flex justify-between items-center w-full">
        {getSensorIconBasedOnType(sensor.type, "w-8 h-8")}
        <div className="flex justify-center">
          {/* Toggle Switch */}
          <div
            className={`w-14 h-7   ${
              status
                ? " bg-white text-left "
                : " bg-transparent text-right border-2 border-white/80 "
            }  rounded-full relative overflow-hidden  `}
          >
            <label
              className={`${
                status ? " left-full  text-gray-800" : "left-6"
              } transition-all duration-300 ease-in-out absolute text-xs top-1`}
            >
              OFF
            </label>

            <label
              className={`${
                status ? " right-8 text-gray-800" : "right-full  "
              } transition-all duration-300 ease-in-out absolute text-xs top-1`}
            >
              ON
            </label>

            <span
              className={` ${
                status ? "left-9" : " left-1"
              } transition-all duration-300 ease-in-out w-4 h-4  ${
                status ? color : "bg-white"
              }  absolute   top-[50%] translate-y-[-50%] rounded-full`}
            ></span>
          </div>
        </div>
      </div>
      <span className="[font-size:clamp(10px,4vw,16px)]  font-bold">
        {sensor.name}
      </span>
    </button>
  );
};

export default SensorOutputButton;
