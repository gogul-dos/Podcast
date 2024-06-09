import Cookies from "js-cookie";
import { Redirect, Route } from "react-router-dom";

const ProtectedComponent = (props) => {
  const credentials = Cookies.get("credentials");
  if (credentials === undefined) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};
export default ProtectedComponent;
