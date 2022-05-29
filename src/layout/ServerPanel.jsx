import React, { useState, useEffect } from "react";
import * as mqtt from "paho-mqtt";
import ConnectionCard from "components/ConnectionCard";
export default function ServerPanel() {
  const [connectionStatus, setConnectionStatus] = useState();

  useEffect(() => {
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
        setConnectionStatus("online");
      },
    });
  }, []);
  return (
    <div className="flex items-center  h-12 w-full  ">
      <ConnectionCard title={"Server"} connectionStatus={connectionStatus} />
    </div>
  );
}
