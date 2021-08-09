import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllGeoData, fetchHistoricalData } from '../actions/geodataActions';
import { GeodataState } from '../reducers/geoDataReducer';
import { AppState } from '../reducers/rootReducer';

export const useGeodataFetch = (): Partial<GeodataState> => {
  const dispatch = useDispatch();
  const { geoData, historicalData, isFetching, error } = useSelector<AppState, GeodataState>(
    state => state.geodataReducer,
  );

  useEffect(() => {
    dispatch(fetchAllGeoData());
  }, [dispatch]);

  return {
    historicalData,
    geoData,
    isFetching,
    error,
  };
};
