import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { FeatureCollection } from 'geojson';
import coronaV2 from '../api/coronaV2';
import { CovidAll, GEOJson, HistoricalDataAll, HistoricalDataCountry } from '../utils';

import {
  GEODATA_SET_COUNTRY,
  GEODATA_FILL,
  GEODATA_START_FETCHING,
  GEODATA_SET_FETCHING_ERROR,
  GeodataActionTypes,
  ErrorHttpAction,
  GEODATA_FILL_HISTORICAL,
  GEODATA_FILL_COVID_ALL,
} from '../types/geodataActionTypes';
import { AppState } from '../reducers/rootReducer';

export function startFetching(): GeodataActionTypes {
  return {
    type: GEODATA_START_FETCHING,
  };
}

export function fillGeoData(payload: FeatureCollection): GeodataActionTypes {
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

export function fillCovidAll(payload: CovidAll): GeodataActionTypes {
  return {
    type: GEODATA_FILL_COVID_ALL,
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
      dispatch(fillGeoData(GEOJson(response.data)));
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
      dispatch(fillGeoData(response.data));
    })
    .catch(error => {
      dispatch(setFetchingError(error));
    });
};

export const fetchCovidDataAll = (): ThunkAction<
  void,
  AppState,
  unknown,
  AnyAction
> => dispatch => {
  dispatch(startFetching);
  coronaV2
    .get(`/countries/all`)
    .then(response => {
      dispatch(fillGeoData(response.data));
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
export const fetchHistoricalDataAll = (): ThunkAction<
  void,
  AppState,
  unknown,
  AnyAction
> => dispatch => {
  dispatch(startFetching);
  coronaV2
    .get(`/historical/all`, { params: { lastdays: 'all' } })
    .then(response => {
      dispatch(fillHistorical(response.data));
    })
    .catch(error => {
      dispatch(setFetchingError(error));
    });
};
