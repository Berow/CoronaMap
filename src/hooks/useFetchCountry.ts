import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryData, fetchHistoricalData } from '../actions/geodataActions';

import { GeodataState } from '../reducers/geoDataReducer';
import { AppState } from '../reducers/rootReducer';

export const useFetchCountry = (country: string): Partial<GeodataState> => {
  const dispatch = useDispatch();
  const { geoData, isFetching, error, historicalData } = useSelector<AppState, GeodataState>(
    state => state.geodataReducer,
  );

  useEffect(() => {
    dispatch(fetchCountryData(country));
    dispatch(fetchHistoricalData(country));
  }, [country]);

  return {
    historicalData,
    geoData,
    isFetching,
    error,
  };
};
