// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup/signup';
import Dashboard from './pages/Dashboard';
import Student from './pages/Student';
import ProtectedRoute from './components/ProtectedRoute';
import Cookies from 'js-cookie';
import Login from './pages/Login/login';

const isAuthenticated = () => {
  return !!Cookies.get('token');
};

function App() {
  return (
    <Router>
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
            isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Signup />
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student" element={<Student />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
