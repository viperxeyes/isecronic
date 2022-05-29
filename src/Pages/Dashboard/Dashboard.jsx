import React, { useState, useEffect } from "react";
import * as mqtt from "paho-mqtt";

import TemperatureCard from "components/TemperatureCard";

import HumidityCard from "components/HumidityCard";
import ConnectionCard from "components/ConnectionCard";
import ComfortCard from "components/ComfortCard";

import SensorOutputButton from "components/SensorOutputButton";

import SensorInputCard from "components/SensorInputCard";
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
  const [fanPowerStatus, setFanPowertatus] = useState(false);
  const [doorStatus, setDoorStatus] = useState(false);
  const [secondaryLightStatus, setSecondaryLightStatus] = useState(false);
  const [airConditionStatus, setAirConditionStatus] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    // getWeather();
    const client = new mqtt.Client(
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_PRODUCTION_ADDRESS
        : process.env.REACT_APP_DEVELOPMENT_ADDRESS,
      9883,
      "/"
    );

    client.connect({
      useSSL: true,
      keepAliveInterval: 5,

      onSuccess: () => {
        console.log("connected");
        client.subscribe("dia-room/controller/status");
        client.subscribe("dia-room/gas/value");
        client.subscribe("dia-room/gas/status");
        client.subscribe("dia-room/temperature/value");
        client.subscribe("dia-room/humidity/value");
        client.subscribe("dia-room/comfort/value");
        client.subscribe("dia-room/mainLight/status");
        client.subscribe("dia-room/door/status");
        client.subscribe("dia-room/door/command");
        client.subscribe("dia-room/secondaryLight/status");
        client.subscribe("dia-room/fanPower/status");
        client.subscribe("dia-room/airCondition/status");
        setClient(client);
      },
    });
    client.onMessageArrived = ({ topic, payloadString }) => {
      if (topic === "dia-room/door/command") {
      }
      if (topic === "dia-room/gas/value") {
        setGasValue(payloadString);
      }
      if (topic === "dia-room/gas/status") {
        setGasDetected(payloadString === "0" ? true : false);
      }
      if (topic === "dia-room/controller/status") {
        setControllerStatus(payloadString);
      }
      if (topic === "dia-room/temperature/value") {
        setTemperatureValue(payloadString);
      }
      if (topic === "dia-room/humidity/value") {
        setHumidityValue(payloadString);
      }
      if (topic === "dia-room/comfort/value") {
        setComfortLevel(payloadString);
      }
      if (topic === "dia-room/mainLight/status") {
        if (payloadString.includes("on")) {
          setMainLightStatus(true);
        } else {
          setMainLightStatus(false);
        }
      }
      if (topic === "dia-room/door/status") {
        if (payloadString.includes("on")) {
          setDoorStatus(true);
        } else {
          setDoorStatus(false);
        }
      }
      if (topic === "dia-room/secondaryLight/status") {
        if (payloadString.includes("on")) {
          setSecondaryLightStatus(true);
        } else {
          setSecondaryLightStatus(false);
        }
      }
      if (topic === "dia-room/fanPower/status") {
        if (payloadString.includes("on")) {
          setFanPowertatus(true);
        } else {
          setFanPowertatus(false);
        }
      }
      if (topic === "dia-room/airCondition/status") {
        if (payloadString.includes("on")) {
          setAirConditionStatus(true);
        } else {
          setAirConditionStatus(false);
        }
      }
    };

    return () => {
      if (client !== null) {
        client.disconnect();
        setClient(null);
      }
    };
  }, []);

  //Interface Start
  return (
    <div className="flex  flex-1 flex-col space-y-5  overflow-y-scroll   ">
      <WeatherContent />
      <div className="flex md:flex-row flex-col md:items-center md:justify-between relative">
        <div className="flex  md:items-center  flex-col space-y-2 pt-2 md:pt-0 md:space-y-0 md:flex-row">
          <span className="font-bold text-center bg-blue-500/30 px-3 mr-2 py-1 rounded">
            Dia room
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-2 ">
        <SensorInputCard
          analogValue={gasValue}
          isTriggered={gasDetected}
          variant="gas"
        />
        <SensorInputCard isTriggered={false} variant="motion" />
        <SensorInputCard isTriggered={false} variant="window" />
        <SensorInputCard isTriggered={false} variant="alarm" />
      </div>

      <div className=" grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-2  ">
        <SensorOutputButton
          sensor={{
            name: "Main",
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
            name: "Secondary",
            type: "bulb",
            controller: "dia-room",
            topic: "secondaryLight/command",
            status: secondaryLightStatus,
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
