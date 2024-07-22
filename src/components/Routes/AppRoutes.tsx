import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from 'pages/Dashboard';
import AddResultContainer from 'pages/AddResult/AddResultContainer';
import { isAuthenticated } from 'utils/auth';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import ProtectedRoute from 'components/Routes/ProtectedRoute';
import SubjectContainer from 'pages/Subject/SubjectContainer';

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
        <Route path="/subject" element={<SubjectContainer />} />
        <Route path="/result/add" element={<AddResultContainer />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
