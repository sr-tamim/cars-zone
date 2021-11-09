import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home"><Home /></Route>
          <Route exact path="/"><Home /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
