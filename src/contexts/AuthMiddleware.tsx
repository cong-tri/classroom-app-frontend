import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./AuthContext";

export const AuthMiddleware = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const restrictedPaths = ["/auth/sign-in"];
  const isRestrictedPath = restrictedPaths.includes(location.pathname);

  if (isAuthenticated && isRestrictedPath) {
    return <Navigate to="/manage-students" replace />;
  }

  if (!isAuthenticated && !isRestrictedPath) {
    return <Navigate to="/auth/sign-in" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
