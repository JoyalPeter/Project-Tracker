import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function PrivateRoutes() {
  const authenticated=useAuth()

  return authenticated ? <Outlet /> : <Navigate to="/signin" />;
}
