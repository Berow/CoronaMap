import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { FeatureCollection } from 'geojson';
import coronaV2 from '../api/coronaV2';
import { GEOJson } from '../utils';

import {
  GEODATA_FILL,
  GEODATA_START_FETCHING,
  GEODATA_SET_FETCHING_ERROR,
  GeodataActionTypes,
  ErrorHttpAction,
} from '../types/geodataActionTypes';
import { AppState } from '../reducers/rootReducer';

export function startFetching(): GeodataActionTypes {
  return {
    type: GEODATA_START_FETCHING,
  };
}

export function fill(payload: FeatureCollection): GeodataActionTypes {
  return {
    type: GEODATA_FILL,
    payload,
  };
}

export function setfetchingError(payload: ErrorHttpAction): GeodataActionTypes {
  return {
    type: GEODATA_SET_FETCHING_ERROR,
    error: true,
    payload,
  };
}

export const fetchGeoData = (): ThunkAction<void, AppState, unknown, AnyAction> => dispatch => {
  dispatch(startFetching);

  coronaV2
    .get('/countries')
    .then(response => {
      dispatch(fill(GEOJson(response.data)));
    })
    .catch(error => {
      dispatch(setfetchingError(error));
    });
};
