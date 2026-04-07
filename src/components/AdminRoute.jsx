import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  return token && role === "admin"
    ? children
    : <Navigate to="/" />;
}
