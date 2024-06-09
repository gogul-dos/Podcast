import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Project from "./Components/Project";
import ProtectedComponent from "./Components/ProtectedComponent"; // Import ProtectedComponent
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/login" component={Login} />
      <ProtectedComponent exact path="/" component={Home} />
      <ProtectedComponent exact path="/:project" component={Project} />
    </BrowserRouter>
  );
}

export default App;
