import { DashboardProvider } from "contexts/DashboardContext";
import { GlobalProvider } from "contexts/GlobalContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppContainer from "./components/layout/AppContainer";
// import Login from "./Pages/Login/Login";

function App() {
  return (
    <GlobalProvider>
      <DashboardProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<AppContainer />} />
          </Routes>
        </BrowserRouter>
      </DashboardProvider>
    </GlobalProvider>
  );
}

export default App;
