import Dashboard from "Pages/Dashboard/Dashboard";
import React from "react";

// const Dashboard = React.lazy(() => import("./Pages/Dashboard/Dashboard"));

const routes = [
  { path: "/dashboard", name: "Dashboard", element: <Dashboard /> },
];

export default routes;
