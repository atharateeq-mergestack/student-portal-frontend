import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from 'pages/Dashboard';
import Subject from 'pages/Subject';
import AddResult from 'pages/AddResult';
import { isAuthenticated } from 'utils/auth';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import ProtectedRoute from 'components/Routes/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Signup/>
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subject" element={<Subject />} />
        <Route path="/result/add" element={<AddResult />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
