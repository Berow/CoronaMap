import { Dispatch } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import coronaV2 from '../api/coronaV2';
import { GEOJson } from '../utils';

export const fetchGeoData = (): ThunkAction => {
  return async (dispatch: Dispatch): ThunkDispatch => {
    const response = await coronaV2.get('/countries');

    dispatch({
      type: 'FETCH_GEO_DATA',
      payload: GEOJson(response.data),
    });
  };
};
