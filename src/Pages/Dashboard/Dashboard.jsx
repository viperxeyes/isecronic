import React, { useState, useEffect } from "react";
import mqtt from "mqtt";

import TemperatureCard from "components/TemperatureCard";
import GasCard from "components/GasCard";
import HumidityCard from "components/HumidityCard";
import ConnectionCard from "components/ConnectionCard";
import ComfortCard from "components/ComfortCard";

import SensorOutputButton from "components/SensorOutputButton";
import MotionCard from "components/MotionCard";
import WindowCard from "components/WindowCard";
import AlarmCard from "components/AlarmCard";
export default function DashboardCopy2() {
  // const [messages, setMessages] = useState([]);

  const [controllerStatus, setControllerStatus] = useState();
  const [gasValue, setGasValue] = useState(0);
  const [gasDetected, setGasDetected] = useState(false);
  const [temperatureValue, setTemperatureValue] = useState(0);
  const [humidityValue, setHumidityValue] = useState(0);
  const [comfortLevel, setComfortLevel] = useState("Initializing...");
  const [mainLightStatus, setMainLightStatus] = useState(false);
  const [fanPowerStatus, setFanPowertatus] = useState(false);
  const [doorStatus, setDoorStatus] = useState(false);
  const [tvStatus, setTvStatus] = useState(false);
  const [airConditionStatus, setAirConditionStatus] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    // getWeather();
    const client = mqtt.connect({
      keepalive: 5,
      hostname:
        process.env.NODE_ENV === "production"
          ? process.env.REACT_APP_PRODUCTION_ADDRESS
          : process.env.REACT_APP_DEVELOPMENT_ADDRESS,
      port: 9883,
      protocol: "wss",
    });
    client.on("connect", () => {
      client.subscribe("dia-room/controller/status");
      client.subscribe("dia-room/gas/value");
      client.subscribe("dia-room/gas/status");
      client.subscribe("dia-room/temperature/value");
      client.subscribe("dia-room/humidity/value");
      client.subscribe("dia-room/comfort/value");
      client.subscribe("dia-room/mainLight/status");
      client.subscribe("dia-room/door/status");
      client.subscribe("dia-room/door/command");
      client.subscribe("dia-room/tv/status");
      client.subscribe("dia-room/fanPower/status");
      client.subscribe("dia-room/airCondition/status");
      setClient(client);
    });

    client.on("message", (topic, payload, packet) => {
      if (topic === "dia-room/door/command") {
      }
      if (topic === "dia-room/gas/value") {
        setGasValue(payload.toString());
      }
      if (topic === "dia-room/gas/status") {
        setGasDetected(payload.toString() === "0" ? true : false);
      }
      if (topic === "dia-room/controller/status") {
        setControllerStatus(payload.toString());
      }
      if (topic === "dia-room/temperature/value") {
        setTemperatureValue(payload.toString());
      }
      if (topic === "dia-room/humidity/value") {
        setHumidityValue(payload.toString());
      }
      if (topic === "dia-room/comfort/value") {
        setComfortLevel(payload.toString());
      }
      if (topic === "dia-room/mainLight/status") {
        if (payload.toString().includes("on")) {
          setMainLightStatus(true);
        } else {
          setMainLightStatus(false);
        }
      }
      if (topic === "dia-room/door/status") {
        if (payload.toString().includes("on")) {
          setDoorStatus(true);
        } else {
          setDoorStatus(false);
        }
      }
      if (topic === "dia-room/tv/status") {
        if (payload.toString().includes("on")) {
          setTvStatus(true);
        } else {
          setTvStatus(false);
        }
      }
      if (topic === "dia-room/fanPower/status") {
        if (payload.toString().includes("on")) {
          setFanPowertatus(true);
        } else {
          setFanPowertatus(false);
        }
      }
      if (topic === "dia-room/airCondition/status") {
        if (payload.toString().includes("on")) {
          setAirConditionStatus(true);
        } else {
          setAirConditionStatus(false);
        }
      }
    });

    return () => {
      if (client !== null) {
        client.end();
        setClient(null);
      }
    };
  }, []);

  //Interface Start
  return (
    <div className="flex  flex-1 flex-col space-y-5  overflow-y-scroll   ">
      <div className="flex md:flex-row flex-col md:items-center md:justify-between relative">
        <div className="flex  md:items-center  flex-col space-y-2 pt-2 md:pt-0 md:space-y-0 md:flex-row">
          <span className="font-bold bg-blue-500/30 px-3 mr-2 py-1 rounded">
            My kitchen office big room in the back yard
          </span>
          <div className="w-fit">
            <ConnectionCard
              title={"Controller"}
              connectionStatus={controllerStatus}
            />
          </div>
        </div>
        <div className="flex items-center  md:static ">
          <TemperatureCard
            temperatureValue={temperatureValue}
            comfortLevel={comfortLevel}
          />
          <HumidityCard humidityValue={humidityValue} />
          <ComfortCard comfortLevel={comfortLevel} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-2 ">
        <GasCard gasValue={gasValue} gasDetected={gasDetected} />
        <MotionCard motionDetected={false} />
        <WindowCard windowOpen={false} />
        <AlarmCard alarmDetected={false} />
      </div>

      <div className=" grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-2  ">
        <SensorOutputButton
          sensor={{
            name: "Room Light",
            type: "bulb",
            controller: "dia-room",
            topic: "mainLight/command",
            status: mainLightStatus,
          }}
          variant
          client={client}
        />
        <SensorOutputButton
          sensor={{
            name: "Room TV",
            type: "tv",
            controller: "dia-room",
            topic: "tv/command",
            status: tvStatus,
          }}
          variant
          client={client}
        />
        <SensorOutputButton
          sensor={{
            name: "Door",
            type: "door",
            controller: "dia-room",
            topic: "door/command",
            status: doorStatus,
          }}
          variant
          client={client}
        />
        <SensorOutputButton
          sensor={{
            name: "Fan",
            type: "fan",
            controller: "dia-room",
            topic: "fanPower/command",
            status: fanPowerStatus,
          }}
          variant
          client={client}
        />
        <SensorOutputButton
          sensor={{
            name: "Air Condition",
            type: "air_condition",
            controller: "dia-room",
            topic: "airCondition/command",
            status: airConditionStatus,
          }}
          variant
          client={client}
        />
      </div>
    </div>
  );
}
