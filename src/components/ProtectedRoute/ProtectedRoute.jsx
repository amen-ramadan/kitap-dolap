import { Navigate } from "react-router";
import useAuthStore from "../../store/authStore";
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.user.jwToken !== null);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
