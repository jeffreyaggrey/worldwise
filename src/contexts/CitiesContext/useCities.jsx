import { useContext } from 'react';
import CitiesContext from './CitiesContext';

export function useCities() {
  const context = useContext(CitiesContext);
  return context;
}
