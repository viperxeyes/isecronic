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
    return (
      <div className="flex flex-1 items-center justify-center">
        <ClipLoader loading color="#3c88fa" />;
      </div>
    );
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
      <Suspense fallback={loading()}>
        <Header />
      </Suspense>
      <div className="flex  space-x-2 lg:space-x-4 flex-1  overflow-hidden">
        <div className="flex lg:mr-2  ">
          <Suspense fallback={loading()}>
            <Sidebar items={items} />
          </Suspense>
        </div>
        <div className="lg:flex lg:flex-row  flex flex-col overflow-y-scroll pr-2 flex-1 ">
          <div className="[flex:0.25]  order-2 lg:order-1 ">
            <div className="justify-between h-full flex flex-col pt-5 lg:pt-0 ">
              <Suspense fallback={loading()}>
                <ControlPanel />
                <div className="hidden lg:block">
                  <ServerPanel />
                </div>
              </Suspense>
            </div>
          </div>
          <div className="flex-1   flex flex-col pb-2 lg:ml-6 lg:mr-4 order-1 lg:order-2">
            <Suspense fallback={loading()}>
              <MainContent />
            </Suspense>
          </div>
          <div className="[flex:0.5] shrink-0  flex order-3 lg:order-3 lg:w-1/3 pt-5 lg:pt-0   ">
            <Suspense fallback={loading()}>
              <ActionPanel />
            </Suspense>
          </div>
          <div className="block lg:hidden order-4">
            <Suspense fallback={loading()}>
              <ServerPanel />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
