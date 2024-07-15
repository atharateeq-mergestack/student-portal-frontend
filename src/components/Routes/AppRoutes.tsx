import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from 'pages/Dashboard/Dashboard';
import Subject from 'pages/Subject/Subject';
import AddResult from 'pages/AddResult/AddResult';
import { isAuthenticated } from 'utils/auth';
import Login from 'pages/Login/login';
import Signup from 'pages/Signup/signup';
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
