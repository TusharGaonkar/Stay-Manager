/* eslint-disable import/extensions */
import { useContext } from 'react';
import { UserAuthContext } from '@/contexts/userAuthProvider';

export default function useUserAuth() {
  const contextValue = useContext(UserAuthContext);

  if (contextValue === null) {
    throw new Error('You forgot to wrap your component within UserAuthProvider');
  }

  return contextValue;
}
