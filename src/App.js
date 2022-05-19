import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppContainer from "./components/layout/AppContainer";
// import Login from "./Pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<AppContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
