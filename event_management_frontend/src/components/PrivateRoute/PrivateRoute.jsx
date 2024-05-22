import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ element, roles }) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="login" />;
  }

  if (roles && roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return element;
}
