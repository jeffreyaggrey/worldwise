import { useContext } from 'react';
import AuthContext from './AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useFakeAuth must be used within a AuthProvider');
  }

  return context;
}
