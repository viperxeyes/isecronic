import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import ConnectionCard from "components/ConnectionCard";
export default function UserPanel() {
  const [connectionStatus, setConnectionStatus] = useState();

  useEffect(() => {
    const client = mqtt.connect("ws://192.168.1.130:9001");
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
