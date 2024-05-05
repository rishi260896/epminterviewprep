import { useAuth } from "./Auth";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }: any) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth?.user) {
    return <Navigate to="/signin" state={{ path: location.pathname }} />;
  }
  return children;
};
