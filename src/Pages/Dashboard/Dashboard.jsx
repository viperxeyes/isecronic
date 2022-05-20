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

        reconnectPeriod: 5000,
        ca: `-----BEGIN CERTIFICATE-----
        MIIDOTCCAiGgAwIBAgIUOElu7DMaGbyxgGk/qMhf26Fx4BgwDQYJKoZIhvcNAQEL
        BQAwLDELMAkGA1UEBhMCRU4xHTAbBgNVBAMMFGlzZWNyb25pYy52ZXJjZWwuYXBw
        MB4XDTIyMDUyMDAyMjEzMVoXDTIzMDUyMDAyMjEzMVowLDELMAkGA1UEBhMCRU4x
        HTAbBgNVBAMMFGlzZWNyb25pYy52ZXJjZWwuYXBwMIIBIjANBgkqhkiG9w0BAQEF
        AAOCAQ8AMIIBCgKCAQEA0X3S5Y0T8sD7MPTJV2HR6ywS5PZqz55iGhBmzAyhSyrn
        T1xHFVt4z8ecOCpKSOUjg3fz7zfrNVmDhR7xB/7CK+ku7ePnARkQ8IXJ3QZnH+dz
        WplJp1bNYmme0eHhVlBXFHCzyA02pQOVexyqviJByKSCkEOp+c2vsuit8H15niSY
        aXmvYGM3Er4sWxuODqfZ8EZgxATEk5VrQFJEz5Yy3U9tO2ct7BiktHQ3cQB9ZfhH
        WLQ93YD++nUHqw+rW0EU3arW48xIQ9oeyJGS+JUHgrcbiIb6p9PxFgDAXI6dNNib
        IHWo1IENnlRhFeDNF1t+qxGCsU2IAk7vRxY1YLmRgQIDAQABo1MwUTAdBgNVHQ4E
        FgQUHRRu0opoJ5JPvd008yBy5VxmzkEwHwYDVR0jBBgwFoAUHRRu0opoJ5JPvd00
        8yBy5VxmzkEwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAutu3
        L5akLVRmOuSBFJCk25DqKnJEHgnwLe55PShDXKZLPPnTwCKfeH4oKvfU8fzZqtX+
        V/XqWcx9+NW8x7SHg87JscEYVwMBOvK2GxJQRu4ULx3zNvCk0OfxccvbDKfAiu4v
        TrNr25OpR7vwJUNFi49WRIO3gynX6Gqp/o7Ypv03bD2AY12jnRJdk6AZvTK+KImT
        BkZ3MAVw6xlUbSq3YTTd1enAhl4aj3nW0OE4hnqnBZWPXDcH1iNj3qXSMpYQr1zM
        Fx1NTnYq5K1D+2xAcX1GdZaxv3a2cEvjn4ksMgcom53A/qiOoDxTlFO43Gm6ijW7
        gpWmCp7S+JsItYZZKg==
        -----END CERTIFICATE-----`,

        protocol: "wss",
        port: 9883,

        hostname: "kaust-backend.giize.com",
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
