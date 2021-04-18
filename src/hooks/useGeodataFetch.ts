import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGeoData } from '../actions/geodataActions';
import { GeodataState } from '../reducers/geoDataReducer';
import { AppState } from '../reducers/rootReducer';

export const useGeodataFetch = (): GeodataState => {
  const dispatch = useDispatch();
  const { geoData, isFetching, error } = useSelector<AppState, GeodataState>(
    state => state.geodataReducer,
  );

  useEffect(() => {
    dispatch(fetchGeoData());
  }, [dispatch]);

  return {
    geoData,
    isFetching,
    error,
  };
};
