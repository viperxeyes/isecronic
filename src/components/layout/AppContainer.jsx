import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import routes from "../../routes";
//import ActionPanel from "./ActionPanel";
import ControlPanel from "./ControlPanel";
import UserPanel from "./UserPanel";
import { BounceLoader, ClipLoader } from "react-spinners";

const ActionPanel = React.lazy(() => import("./ActionPanel"));
//const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

export default function AppContainer() {
  const loading = () => {
    return <ClipLoader loading color="#3c88fa" />;
  };

  return (
    <div className="flex bg-gray-700 flex-1">
      <Suspense fallback={loading()}>
        <Sidebar />
      </Suspense>
      <div className="flex flex-1 flex-col  h-screen ">
        <Suspense fallback={loading()}>
          <Topbar />
        </Suspense>

        <div className="bg-gray-700 flex flex-1 overflow-y-hidden">
          <div className="bg-gray-800 w-56 flex-none  flex flex-col justify-between dark  ">
            <Suspense fallback={loading()}>
              <ControlPanel />
              <UserPanel />
            </Suspense>
          </div>
          <div className=" flex-1 flex justify-between dark ">
            <div className="bg-gray-700  dark:text-gray-200 flex-1 overflow-y-auto scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md ">
              <Suspense fallback={loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        component={route.component}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </div>
            <Suspense fallback={loading()}>
              <ActionPanel />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
