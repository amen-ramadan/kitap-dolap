import { Navigate } from "react-router";
import useAuthStore from "../../store/authStore";
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; //useAuthStore((state) => state.token !== null);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
