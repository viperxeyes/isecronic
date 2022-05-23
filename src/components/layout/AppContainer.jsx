import React, { Suspense } from "react";

import Sidebar from "./Sidebar";

//import ActionPanel from "./ActionPanel";
import ControlPanel from "./ControlPanel";

import { ClipLoader } from "react-spinners";
import MainContent from "./MainContent";
import WeatherContent from "components/WeatherContent";

import Header from "components/layout/Header";
import ServerPanel from "./ServerPanel";
const ActionPanel = React.lazy(() => import("./ActionPanel"));
//const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

export default function AppContainer() {
  const loading = () => {
    return <ClipLoader loading color="#3c88fa" />;
  };

  const items = [
    { name: "fa-sensor" },
    { name: "fa-sensor" },
    { name: "fa-sensor" },
    { name: "fa-sensor" },
    { name: "fa-sensor" },
    { name: "fa-sensor" },
    { name: "fa-sensor" },
    { name: "fa-sensor" },
  ];

  return (
    <div className="flex flex-col h-screen min-h-screen  text-slate-300  bg-gray-900 overflow-hidden  ">
      <Header />
      <div className="flex space-x-4 flex-1 overflow-hidden">
        <div className="[flex:0.125] flex ">
          <Sidebar items={items} />
        </div>
        <div className="[flex:0.25]   ">
          <div className="justify-between h-full flex flex-col">
            <ControlPanel />
            <ServerPanel />
          </div>
        </div>
        <div className="flex-1  flex flex-col pb-2">
          <WeatherContent />
          <MainContent />
        </div>
        <div className="[flex:0.5] flex  ">
          <ActionPanel />
        </div>
      </div>
    </div>
  );
}
