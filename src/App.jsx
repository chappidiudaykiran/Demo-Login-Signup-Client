import { Routes, Route, Navigate, BrowserRouter, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PageTransition from './components/PageTransition';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();
  
  if (loading) return <div className="h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;
  
  return children;
};

// Redirect Route if already logged in
const PublicRoute = ({ children }) => {
  const { token } = useAuth();
  
  if (token) return <Navigate to="/dashboard" replace />;
  
  return children;
};

// Animated Routes — key={pathname} forces remount on navigation = triggers transition
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </PageTransition>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
