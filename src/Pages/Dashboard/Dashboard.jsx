import React, { useState, useEffect } from "react";
import mqtt from "mqtt";

import TemperatureCard from "components/TemperatureCard";
import GasCard from "components/GasCard";
import HumidityCard from "components/HumidityCard";
import ConnectionCard from "components/ConnectionCard";
import ComfortCard from "components/ComfortCard";
import WeatherContent from "components/WeatherContent";
export default function DashboardCopy2() {
  // const [messages, setMessages] = useState([]);

  const [controllerStatus, setControllerStatus] = useState();
  const [gasValue, setGasValue] = useState(0);
  const [gasDetected, setGasDetected] = useState(false);
  const [temperatureValue, setTemperatureValue] = useState(0);
  const [humidityValue, setHumidityValue] = useState(0);
  const [comfortLevel, setComfortLevel] = useState("Initializing...");
  const [mainLightStatus, setMainLightStatus] = useState(false);
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
      setClient(client);
    });

    client.on("message", (topic, payload, packet) => {
      // console.log(topic, payload.toString());
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
    <div className="flex  flex-col space-y-5 ">
      <WeatherContent comfortLevel={comfortLevel} />

      <div className="flex flex-col space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2 items-center">
            <span className="font-bold bg-blue-500/30 px-3 py-1 rounded">
              Dia Room
            </span>
            <div className="flex w-fit flex-row space-x-5">
              <ConnectionCard
                title={"Controller"}
                connectionStatus={controllerStatus}
              />
            </div>
          </div>
          <div className="flex items-center">
            <TemperatureCard
              temperatureValue={temperatureValue}
              comfortLevel={comfortLevel}
            />
            <HumidityCard humidityValue={humidityValue} />
            <ComfortCard comfortLevel={comfortLevel} />
          </div>
        </div>
        <div className="self-end"></div>
      </div>
      <GasCard gasValue={gasValue} gasDetected={gasDetected} />
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
    </div>
  );
}
