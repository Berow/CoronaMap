import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { FeatureCollection } from 'geojson';
import coronaV2 from '../api/coronaV2';
import { GEOJson, HistoricalDataAll, HistoricalDataCountry } from '../utils';

import {
  GEODATA_SET_COUNTRY,
  GEODATA_FILL,
  GEODATA_START_FETCHING,
  GEODATA_SET_FETCHING_ERROR,
  GeodataActionTypes,
  ErrorHttpAction,
  GEODATA_FILL_HISTORICAL,
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

export function fillHistorical(
  payload: HistoricalDataCountry | HistoricalDataAll,
): GeodataActionTypes {
  return {
    type: GEODATA_FILL_HISTORICAL,
    payload,
  };
}

export function setFetchingError(payload: ErrorHttpAction): GeodataActionTypes {
  return {
    type: GEODATA_SET_FETCHING_ERROR,
    error: true,
    payload,
  };
}

export function setCountry(payload: string): GeodataActionTypes {
  return {
    type: GEODATA_SET_COUNTRY,
    payload,
  };
}

export const fetchAllGeoData = (): ThunkAction<void, AppState, unknown, AnyAction> => dispatch => {
  dispatch(startFetching);
  coronaV2
    .get('/countries')
    .then(response => {
      dispatch(fill(GEOJson(response.data)));
    })
    .catch(error => {
      dispatch(setFetchingError(error));
    });
};

export const fetchCountryData = (
  country: string,
): ThunkAction<void, AppState, unknown, AnyAction> => dispatch => {
  dispatch(startFetching);
  coronaV2
    .get(`/countries/${country}`)
    .then(response => {
      dispatch(fill(response.data));
    })
    .catch(error => {
      dispatch(setFetchingError(error));
    });
};

export const fetchHistoricalData = (
  country?: string,
): ThunkAction<void, AppState, unknown, AnyAction> => dispatch => {
  dispatch(startFetching);
  coronaV2
    .get(`/historical/${country}`, { params: { lastdays: 'all' } })
    .then(response => {
      dispatch(fillHistorical(response.data));
    })
    .catch(error => {
      dispatch(setFetchingError(error));
    });
};
