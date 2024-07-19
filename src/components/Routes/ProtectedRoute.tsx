
import { Navigate, Outlet } from 'react-router-dom';

import { isAuthenticated } from 'utils/auth';

function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
