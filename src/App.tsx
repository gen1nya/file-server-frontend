import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthInitPage } from './pages/AuthInitPage';

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth/init" />} />
            <Route path="/auth/init" element={<AuthInitPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
    );
};