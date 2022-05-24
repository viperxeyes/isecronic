import { createContext, useContext } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};
const useGlobal = () => useContext(GlobalContext);
export { GlobalProvider, useGlobal };
