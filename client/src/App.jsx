import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Plans from './pages/Plans';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminSubscriptions from './pages/AdminSubscriptions';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login /> : <Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'} />} 
          />
          <Route 
            path="/register" 
            element={!isAuthenticated ? <Register /> : <Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'} />} 
          />
          <Route path="/plans" element={<Plans />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/subscriptions" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminSubscriptions />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/plans" />} />
          <Route path="*" element={<Navigate to="/plans" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;