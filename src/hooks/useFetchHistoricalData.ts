import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoricalData } from '../actions/geodataActions';
import { GeodataState } from '../reducers/geoDataReducer';
import { AppState } from '../reducers/rootReducer';

export const usefetchHistoricalData = (country: string): Partial<GeodataState> => {
  const dispatch = useDispatch();
  const { historicalData, isFetching, error } = useSelector<AppState, GeodataState>(
    state => state.geodataReducer,
  );

  useEffect(() => {
    dispatch(fetchHistoricalData(country));
  }, [country]);

  return {
    historicalData,
    isFetching,
    error,
  };
};
