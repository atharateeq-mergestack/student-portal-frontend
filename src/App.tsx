import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ProtectedRoute from 'components/ProtectedRoute';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import Dashboard from 'pages/Dashboard';
import Student from 'pages/Student';

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
        <Route
          path="/login"
          element={
            isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />
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
