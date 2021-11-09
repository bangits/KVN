import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ChoicePage from "./components/ChoicePage";
import JuryPage from "./components/JuryPage";
import TotalsPage from "./components/TotalsPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/jury">
          <JuryPage />
        </Route>
        <Route path="/totals">
          <TotalsPage />
        </Route>
        <Route path="/">
          <ChoicePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
