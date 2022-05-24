import { createContext, useContext } from "react";

const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  return (
    <DashboardContext.Provider value={{}}>{children}</DashboardContext.Provider>
  );
};
const useDashboard = () => useContext(DashboardContext);
export { DashboardProvider, useDashboard };
