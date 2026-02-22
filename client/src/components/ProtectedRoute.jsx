import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, userRole } = useSelector((state) => state.auth);
  const location = useLocation();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (adminOnly && userRole !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default ProtectedRoute;