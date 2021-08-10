import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoricalDataAll } from '../actions/geodataActions';
import { GeodataState } from '../reducers/geoDataReducer';
import { AppState } from '../reducers/rootReducer';

export const usefetchHistoricalDataAll = (country: string): Partial<GeodataState> => {
  const dispatch = useDispatch();
  const { historicalData, isFetching, error } = useSelector<AppState, GeodataState>(
    state => state.geodataReducer,
  );

  useEffect(() => {
    dispatch(fetchHistoricalDataAll());
  }, [country]);

  return {
    historicalData,
    isFetching,
    error,
  };
};
