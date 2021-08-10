import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCovidDataAll, fetchHistoricalDataAll } from '../actions/geodataActions';
import { GeodataState } from '../reducers/geoDataReducer';
import { AppState } from '../reducers/rootReducer';

export const useCovidDataAllFetch = (): Partial<GeodataState> => {
  const dispatch = useDispatch();
  const { covidAllData, historicalData, isFetching, error } = useSelector<AppState, GeodataState>(
    state => state.geodataReducer,
  );

  useEffect(() => {
    dispatch(fetchCovidDataAll());
    dispatch(fetchHistoricalDataAll());
  }, [dispatch]);

  return {
    historicalData,
    covidAllData,
    isFetching,
    error,
  };
};
