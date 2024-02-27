import { useCallback, useEffect, useReducer } from 'react';
import CitiesContext from './CitiesContext';

const BASE_URL = 'http://localhost:8000';

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, cities: action.payload, isLoading: false };
    case 'city/loaded':
      return { ...state, currentCity: action.payload, isLoading: false };
    case 'city/created':
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {},
        isLoading: false,
      };
    case 'rejected':
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error('Unknown action type');
  }
}

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: '',
};

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, currentCity, isLoading, error } = state;

  useEffect(function () {
    async function getCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading the cities',
        });
      }
    }
    getCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      try {
        dispatch({ type: 'loading' });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: 'city/loaded', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading the city',
        });
      }
    },
    [currentCity.id],
  );

  async function createCity(city) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();

      dispatch({ type: 'city/created', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating the city',
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading' });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: id });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting the city',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        isLoading,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesProvider;
