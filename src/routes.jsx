import AreaDetails from "Pages/Area/AreaDetails";
import AreaList from "Pages/Area/AreaList";
import Dashboard from "Pages/Dashboard/Dashboard";
import React from "react";

// const Dashboard = React.lazy(() => import("./Pages/Dashboard/Dashboard"));

const routes = [
  { path: "/dashboard", name: "Dashboard", element: <Dashboard /> },
  { path: "/areas", name: "Areas", element: <AreaList /> },
  { path: "/areas/:id", name: "area", element: <AreaDetails /> },
  { path: "/areas/new", name: "area", element: <AreaDetails isNew /> },
];

export default routes;
