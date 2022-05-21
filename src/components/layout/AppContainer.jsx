import React, { Suspense } from "react";

import Sidebar from "./Sidebar";

//import ActionPanel from "./ActionPanel";
import ControlPanel from "./ControlPanel";
import UserPanel from "./UserPanel";
import { ClipLoader } from "react-spinners";
import MainContent from "./MainContent";

const ActionPanel = React.lazy(() => import("./ActionPanel"));
//const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

export default function AppContainer() {
  const loading = () => {
    return <ClipLoader loading color="#3c88fa" />;
  };

  const items = [{ name: "fa-user" }, { name: "fa-trash" }];

  return (
    <div className="flex bg-gray-900 flex-1 text-slate-300 ">
      <Suspense fallback={loading()}>
        <Sidebar items={items} />
      </Suspense>
      <div className="flex flex-1 flex-col ml-6  h-screen ">
        <div className="flex flex-1 overflow-y-hidden">
          <div className=" w-56 flex-none   flex flex-col justify-between    ">
            <p className="text-5xl self-center py-9">iSecronic</p>
            <Suspense fallback={loading()}>
              <ControlPanel />
              <UserPanel />
            </Suspense>
          </div>

          <div className=" flex-1 flex justify-between dark ">
            <MainContent />
            <Suspense fallback={loading()}>
              <ActionPanel />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
