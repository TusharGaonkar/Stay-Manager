/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable object-curly-newline */
import { createContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import supabase from '../../api/supabaseClient';
import { toast } from '@/shadcn_components/ui/use-toast';

export const UserAuthContext = createContext<null | {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  userData: Record<string, unknown>;
}>(null);

export default function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<Record<string, unknown>>({ user: null });

  const { isLoading, isError, isSuccess } = useQuery({
    queryFn: async () => {
      const { data: { user = {} } = { data: {} } } = await supabase.auth.getUser();

      return user;
    },

    queryKey: ['login'],
    onSuccess: (user) => {
      setUserData(user as Record<string, unknown>);
    },
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error',
        description: 'An error occured while verifying your credentials.',
        variant: 'destructive',
      });
    } else if (isSuccess && !userData) {
      toast({
        title: 'Info',
        description: 'Please login to continue.',
      });
    }
  }, [isError, isSuccess, userData]);

  const contextValue = useMemo(
    () => ({ isLoading, isError, isSuccess, userData }),
    [isLoading, isError, isSuccess, userData]
  );

  return <UserAuthContext.Provider value={contextValue}>{children}</UserAuthContext.Provider>;
}
