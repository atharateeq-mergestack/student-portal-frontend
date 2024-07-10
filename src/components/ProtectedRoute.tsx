
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedRoute() {
  const isAuthenticated = !!Cookies.get('token');

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
