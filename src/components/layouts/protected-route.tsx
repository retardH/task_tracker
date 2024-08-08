import { getAuthInfo } from "@/lib/utils";
import { ReactNode } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = getAuthInfo();
  return <>{!!token ? children : <Navigate to="/login" replace />}</>;
};

export default ProtectedRoute;
