import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Booking from './pages/Booking';
import Rooms from './pages/Rooms';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import PageNotFound from './pages/PageNotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} errorElement={<ErrorPage />} />
        <Route path="/dashboard" element={<Dashboard />} errorElement={<ErrorPage />} />
        <Route path="/account" element={<Account />} errorElement={<ErrorPage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/rooms" element={<Rooms />} errorElement={<ErrorPage />} />
        <Route path="/settings" element={<Settings />} errorElement={<ErrorPage />} />
        <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
        <Route path="/users" element={<Users />} errorElement={<ErrorPage />} />
        <Route path="*" element={<PageNotFound />} errorElement={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
