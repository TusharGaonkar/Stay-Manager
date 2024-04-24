/* eslint-disable import/extensions */
import { useNavigate } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import useUserAuth from '@/hooks/useUserAuth';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <MoonLoader color="#cdc8ff" size={50} />
    </div>
  );
}

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, isSuccess, isError, userData } = useUserAuth();
  const navigate = useNavigate();

  if (isError || (isSuccess && !userData)) {
    navigate('/login');
  }
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isSuccess && userData && children}
    </>
  );
}
