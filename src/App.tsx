/* eslint-disable object-curly-newline */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Rooms from './pages/Rooms';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import PageNotFound from './pages/PageNotFound';
import { ThemeProvider } from './contexts/theme-provider';
import Bookings from './pages/Bookings';

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} errorElement={<ErrorPage />} />
              <Route path="account" element={<Account />} errorElement={<ErrorPage />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="rooms" element={<Rooms />} errorElement={<ErrorPage />} />
              <Route path="settings" element={<Settings />} errorElement={<ErrorPage />} />
              <Route path="login" element={<Login />} errorElement={<ErrorPage />} />
              <Route path="users" element={<Users />} errorElement={<ErrorPage />} />
              <Route path="*" element={<PageNotFound />} errorElement={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
