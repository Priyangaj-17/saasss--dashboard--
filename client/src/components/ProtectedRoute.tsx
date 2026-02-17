import { useSelector } from "react-redux";
import { RootState } from "../apps/store";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  if (!token) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
