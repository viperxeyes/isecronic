import React from "react";

const ConnectionCard = ({ title, connectionStatus }) => {
  return (
    <div className="flex items-center bg-slate-800 w-[250px]   px-5 py-2 rounded-lg space-x-2">
      <img
        src={
          connectionStatus == "online"
            ? "assets/images/online.png"
            : "assets/images/offline.png "
        }
        className="w-[32px] h-[32px]"
      />
      <div className="flex flex-col">
        <span className="text-xl ">
          {title}{" "}
          {connectionStatus &&
            (connectionStatus = connectionStatus.replace(
              /(\w)(\w*)/g,
              function (g0, g1, g2) {
                return g1.toUpperCase() + g2.toLowerCase();
              }
            ))}
        </span>
      </div>
    </div>
  );
};

export default ConnectionCard;
