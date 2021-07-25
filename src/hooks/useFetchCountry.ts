import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryData } from '../actions/geodataActions';
import { GeodataState } from '../reducers/geoDataReducer';
import { AppState } from '../reducers/rootReducer';

export const useFetchCountry = (country: string): Partial<GeodataState> => {
  const dispatch = useDispatch();
  const { geoData, isFetching, error } = useSelector<AppState, GeodataState>(
    state => state.geodataReducer,
  );

  useEffect(() => {
    dispatch(fetchCountryData(country));
  }, [country]);

  return {
    geoData,
    isFetching,
    error,
  };
};
