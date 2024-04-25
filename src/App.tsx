/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextUIProvider } from '@nextui-org/react';
import MoonLoader from 'react-spinners/MoonLoader';
import { ThemeProvider } from './contexts/themeProvider';
import Login from './features/Authentication/Login';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './features/Authentication/ProtectedRoute';
import UserAuthProvider from './contexts/userAuthProvider';

const AppLayout = lazy(() => import('./ui/AppLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Account = lazy(() => import('./pages/Account'));
const Rooms = lazy(() => import('./pages/Rooms'));
const Settings = lazy(() => import('./pages/Settings'));
const BookingsInfo = lazy(() => import('./pages/BookingsInfo'));
const Bookings = lazy(() => import('./pages/Bookings'));
const RegisterNewGuest = lazy(() => import('./pages/RegisterNewGuest'));
const NewBooking = lazy(() => import('./pages/NewBooking'));

const queryClient = new QueryClient();

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <MoonLoader color="#cdc8ff" size={50} />
    </div>
  );
}

function App() {
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
              <Route
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <UserAuthProvider>
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    </UserAuthProvider>
                  </Suspense>
                }
              >
                <Route index element={<Navigate to="dashboard" />} />
                <Route
                  path="dashboard"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Dashboard />
                    </Suspense>
                  }
                  errorElement={<ErrorPage />}
                />
                <Route
                  path="account"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Account />
                    </Suspense>
                  }
                  errorElement={<ErrorPage />}
                />
                <Route
                  path="rooms"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Rooms />
                    </Suspense>
                  }
                  errorElement={<ErrorPage />}
                />
                <Route
                  path="settings"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Settings />
                    </Suspense>
                  }
                  errorElement={<ErrorPage />}
                />
                <Route
                  path="bookings"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Bookings />
                    </Suspense>
                  }
                  errorElement={<ErrorPage />}
                />
                <Route
                  path="bookings/newBooking"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <RegisterNewGuest />
                    </Suspense>
                  }
                  errorElement={<ErrorPage />}
                />
                <Route
                  path="bookings/newBooking/:guestID"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <NewBooking />
                    </Suspense>
                  }
                  errorElement={<ErrorPage />}
                />
                <Route
                  path="bookings/bookingInfo/:bookingID"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <BookingsInfo />
                    </Suspense>
                  }
                  errorElement={<ErrorPage />}
                />
                <Route
                  path="*"
                  element={<Navigate to="dashboard" />}
                  errorElement={<ErrorPage />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </NextUIProvider>
  );
}

export default App;
