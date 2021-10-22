import React from "react";

const Dashboard = React.lazy(() => import("./Pages/Dashboard/Dashboard"));

const routes = [
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
];

export default routes;
