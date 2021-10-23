import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppContainer from "./components/layout/AppContainer";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/login" name="Login" component={Login} />
        <Route exact path="/" name="Home" component={AppContainer} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
