import React, { useState, useEffect } from "react";
import mqtt from "mqtt";

import TemperatureCard from "components/TemperatureCard";
import GasCard from "components/GasCard";
import HumidityCard from "components/HumidityCard";
import ConnectionCard from "components/ConnectionCard";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState();
  const [controllerStatus, setControllerStatus] = useState();
  const [gasValue, setGasValue] = useState(0);
  const [temperatureValue, setTemperatureValue] = useState(0);
  const [humidityValue, setHumidityValue] = useState(0);
  const [comfortLevel, setComfortLevel] = useState("Initializing...");
  const [mainLightStatus, setMainLightStatus] = useState(false);
  const [client, setClient] = useState(null);
  if (client !== null) {
    client.on("message", (topic, payload, packet) => {
      if (topic == "dia-room/gas/value") {
        setGasValue(payload.toString());
      }
      if (topic == "dia-room/controller/status") {
        setControllerStatus(payload.toString());
      }
      if (topic == "dia-room/temperature/value") {
        setTemperatureValue(payload.toString());
      }
      if (topic == "dia-room/humidity/value") {
        setHumidityValue(payload.toString());
      }
      if (topic == "dia-room/comfort/value") {
        setComfortLevel(payload.toString());
      }
      if (topic == "dia-room/mainLight/status") {
        console.log(topic, payload.toString());
        if (payload.toString().includes("on")) {
          setMainLightStatus(true);
        } else {
          setMainLightStatus(false);
        }
      }
    });
  }
  useEffect(() => {
    let client = null;
    if (client == null) {
      client = mqtt.connect({
        clientId: "React App",
        port: 9001,
        hostname: "kaust-backend.giize.com",
        reconnectPeriod: 5000,

        protocol: "wss",
        ca: `-----BEGIN CERTIFICATE-----
      MIIDJTCCAg2gAwIBAgIUPm4R458kYHEN5mEgpaHIMCTQJUkwDQYJKoZIhvcNAQEL
      BQAwIjEgMB4GA1UEAwwXa2F1c3QtYmFja2VuZC5naWl6ZS5jb20wHhcNMjIwNTE5
      MDcyNTI2WhcNMjIwNjE4MDcyNTI2WjAiMSAwHgYDVQQDDBdrYXVzdC1iYWNrZW5k
      LmdpaXplLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOwTldm+
      gAFVtA2YlEXQzIcq7QfMzzKFOgAkif2X1dRCLoXnsBWtjNfsdpdnPyM7VeHgUaMt
      yARzGC+uqdimreIfXZn3bs2vH4JdQbaX97D+zQMLx+4gnttgg2MDB5qb5tkvm6YX
      uDDTJ9+xyzhIPEJ8DVa0Cf6B5WVLcPx9vPf/rwO/nW2qrtqtT3AAV5yo09TFkRlu
      5PSwM+VvGq98F5LztNHFPNQAlwLCzOpwRC0VNL5m3aaLu+Sz/Yqos2up0aLwDR/y
      JXowo9MZIz+ULcCZxfJVwFhx6L8AlYH0i0N9lv7xvuY4wrlpocUjPoqyNCQM/bcK
      89xLr3Ht0vjXmDMCAwEAAaNTMFEwHQYDVR0OBBYEFKdVDFOtXiiNQe9bgYTcQABP
      bQOUMB8GA1UdIwQYMBaAFKdVDFOtXiiNQe9bgYTcQABPbQOUMA8GA1UdEwEB/wQF
      MAMBAf8wDQYJKoZIhvcNAQELBQADggEBAJCMwae6Dcp8HmGam2HSQ4iheua1+nr9
      B9/Byh4x9o4hWqz0R4s6FmlMfPVU24ZJkBTclLL2rVwsulQFelC+ZQYcbeUbNC9R
      7JocvsV98xWQmY4tWEIyaGxLwz6VkimdlCOyfG/ZJbGMDftwXitD9I3lud+pWPXQ
      UiwF4rIFRFj4T17k93pdyxiUVKlJ1YQ9N6qQr8+ERiQPuAejsX697tD00XxdU9is
      9yzK7arGcCYV15CNYywa8G6kqRHMTTSm6+b+htIZ3RSVWaWo5aGltStRY8jKkEmS
      yHgUOrs7RhFElpyhKLu/Ve81RGWajM9Bdvb6n6oahxmV6YsVxT+PodM=
      -----END CERTIFICATE-----`,
      });
      client.on("connect", () => {
        setConnectionStatus("online");
        client.subscribe("dia-room/controller/status");
        client.subscribe("dia-room/gas/value");
        client.subscribe("dia-room/temperature/value");
        client.subscribe("dia-room/humidity/value");
        client.subscribe("dia-room/comfort/value");
        client.subscribe("dia-room/mainLight/status");
      });

      client.on("disconnect", () => {
        setConnectionStatus("offline");
      });

      setClient(client);
    }
    return () => {
      if (client !== null) {
        client.end();
        setClient(null);
      }
    };
  }, []);
  return (
    <div className="flex  flex-col space-y-5 p-5">
      <div className="flex flex-row space-x-5">
        <ConnectionCard title={"Server"} connectionStatus={connectionStatus} />
        <ConnectionCard
          title={"Controller"}
          connectionStatus={controllerStatus}
        />
      </div>

      <div className="flex flex-col space-y-5">
        <GasCard gasValue={gasValue} />
        <TemperatureCard
          temperatureValue={temperatureValue}
          comfortLevel={comfortLevel}
        />

        <HumidityCard humidityValue={humidityValue} />
      </div>

      <button
        onClick={() => {
          mainLightStatus
            ? client.publish("dia-room/mainLight/command", "off")
            : client.publish("dia-room/mainLight/command", "on");
        }}
        className="bg-slate-800 flex flex-col  items-center group space-y-5 hover:bg-slate-800/90 shadow-md hover:shadow-lg transition-all duration-300 ease-out rounded-lg px-5 py-2 min-w-fit w-[180px] min-h-fit h-[150px]"
      >
        <span>Main Light</span>
        <img
          src={
            mainLightStatus
              ? "assets/images/lightOn.png"
              : "assets/images/lightOff.png"
          }
          className="w-[90px] h-[90px] group-hover:w-[95px] group-hover:h-[95px] group-hover:animate-bounce transition-all duration-300 ease-out"
        />
      </button>
    </div>
  );
}
