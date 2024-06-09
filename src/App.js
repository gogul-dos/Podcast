import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Project from "./Components/Project";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/:project" component={Project} />
    </BrowserRouter>
  );
}

export default App;
