import { useSelector } from 'react-redux';
import { AppState } from '../reducers/rootReducer';

export const useGetCountry = (): string => {
  const country = useSelector<AppState, string>(state => state.geodataReducer.country);

  return country;
};
