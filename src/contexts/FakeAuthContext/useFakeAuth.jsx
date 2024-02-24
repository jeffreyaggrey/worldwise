import { useContext } from 'react';
import AuthContext from './FakeAuthContext';

export function useFakeAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useFakeAuth must be used within a AuthProvider');
  }

  return context;
}
