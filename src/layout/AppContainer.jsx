import React, { Suspense } from "react";

import Sidebar from "./Sidebar";

//import ActionPanel from "./ActionPanel";
import ControlPanel from "./ControlPanel";

import { ClipLoader } from "react-spinners";
import MainContent from "./MainContent";
import WeatherContent from "components/WeatherContent";

import Header from "layout/Header";
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
      <div className="flex space-x-2 lg:space-x-4 flex-1 overflow-hidden">
        <div className="[flex:0.125] flex  ">
          <Sidebar items={items} />
        </div>
        <div className="lg:flex lg:flex-row  flex flex-col overflow-y-scroll">
          <div className="[flex:0.25]  order-2 lg:order-1 ">
            <div className="justify-between h-full flex flex-col pt-5 lg:pt-0 ">
              <ControlPanel />
              <div className="hidden lg:block">
                <ServerPanel />
              </div>
            </div>
          </div>
          <div className="flex-1  flex flex-col pb-2 lg:ml-6 lg:mr-4 order-1 lg:order-2">
            <WeatherContent />
            <MainContent />
          </div>
          <div className="[flex:0.5] flex order-3 lg:order-3 pt-5 lg:pt-0  ">
            <ActionPanel />
          </div>
          <div className="block lg:hidden order-4">
            <ServerPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
