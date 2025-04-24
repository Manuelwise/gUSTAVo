import { AuthProvider } from './context/AuthContext';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RequestForm from './pages/RequestForm';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ThankYou from './pages/utils/ThankYou';
import ProtectedRoute from './components/ProtectedRoute';
import NewUserAdmin from './pages/NewUserAdmin';
import AuditLogs from './pages/AuditLogs';  
import UsersGrid from './pages/UsersGrid';
import Reports from './pages/Reports';
import { UserProvider } from './context/UserContext';

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/request" element={<RequestForm />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin/audit-logs" 
      element={
        <ProtectedRoute>
            <AuditLogs />
        </ProtectedRoute>
          } 
           />
              <Route path="/admin/new-user" 
              element={
                <ProtectedRoute>
                  <NewUserAdmin />
                </ProtectedRoute>
              } />
              <Route path="/admin/reports" 
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" 
              element={
                <ProtectedRoute>
                  <UsersGrid />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;