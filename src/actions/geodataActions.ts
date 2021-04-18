import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import coronaV2 from '../api/coronaV2';
import { GEOJson } from '../utils';
import {
  GEODATA_FILL,
  GEODATA_START_FETCHING,
  GEODATA_SET_FETCHING_ERROR,
} from '../types/geodataActionTypes';
import { AppState } from '../reducers/rootReducer';

export const fetchGeoData = (): ThunkAction<void, AppState, unknown, AnyAction> => dispatch => {
  dispatch({
    type: GEODATA_START_FETCHING,
  });

  coronaV2
    .get('/countries')
    .then(response => {
      dispatch({
        type: GEODATA_FILL,
        payload: GEOJson(response.data),
      });
    })
    .catch(error => {
      dispatch({
        type: GEODATA_SET_FETCHING_ERROR,
        error: true,
        status: error,
      });
    });
};
