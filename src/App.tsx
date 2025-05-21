import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CompetitionFrontPage from './pages/CompetitionFrontPage';
import AdminLayout from './components/Layout/AdminLayout';
import CompetitionModule from './pages/admin/CompetitionModule';
import AdminLogin from './pages/admin/AdminLogin';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CompetitionFrontPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="competitions" element={<CompetitionModule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;