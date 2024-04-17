/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextUIProvider } from '@nextui-org/react';
import MoonLoader from 'react-spinners/MoonLoader';
import { ThemeProvider } from './contexts/theme-provider';
import ErrorPage from './pages/ErrorPage';
import PageNotFound from './pages/PageNotFound';

const AppLayout = lazy(() => import('./ui/AppLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Account = lazy(() => import('./pages/Account'));
const Rooms = lazy(() => import('./pages/Rooms'));
const Settings = lazy(() => import('./pages/Settings'));
const Login = lazy(() => import('./pages/Login'));
const BookingsInfo = lazy(() => import('./pages/BookingsInfo'));
const Bookings = lazy(() => import('./pages/Bookings'));
const NewGuest = lazy(() => import('./pages/RegisterNewGuest'));
const NewBookings = lazy(() => import('./pages/NewBooking'));

const queryClient = new QueryClient();

function LoadingSpinner() {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <MoonLoader color="#36d7b7" size={40} />
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
              <Route
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <AppLayout />
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
                  path="login"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Login />
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
                      <NewGuest />
                    </Suspense>
                  }
                  errorElement={<ErrorPage />}
                />
                <Route
                  path="bookings/newBooking/:guestID"
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <NewBookings />
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
                <Route path="*" element={<PageNotFound />} errorElement={<ErrorPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NextUIProvider>
  );
}

export default App;
