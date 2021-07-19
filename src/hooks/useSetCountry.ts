import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCountryName } from '../actions/geodataActions';

export const useSetCountry = (country: string): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCountryName(country));
  }, [dispatch]);
};
