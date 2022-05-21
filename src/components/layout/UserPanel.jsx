import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import ConnectionCard from "components/ConnectionCard";
export default function UserPanel() {
  const [connectionStatus, setConnectionStatus] = useState();

  useEffect(() => {
    const client = mqtt.connect({
      hostname:
        process.env.NODE_ENV === "production"
          ? process.env.REACT_APP_PRODUCTION_ADDRESS
          : process.env.REACT_APP_DEVELOPMENT_ADDRESS,
      port: 9883,
      protocol: "wss",
      keepalive: 5,
    });
    client.on("connect", () => {
      setConnectionStatus("online");
    });
  }, []);
  return (
    <div className="flex items-center  h-12 w-full  ">
      <ConnectionCard title={"Server"} connectionStatus={connectionStatus} />
    </div>
  );
}
