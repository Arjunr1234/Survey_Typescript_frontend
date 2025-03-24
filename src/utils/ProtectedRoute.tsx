import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  role: "admin" | "user";
  children?: ReactNode; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
  const { isUserLoggedIn, isAdminLoggedIn } = useAuth();

  if (role === "admin" && !isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  if (role === "user" && !isUserLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
