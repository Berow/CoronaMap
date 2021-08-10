import { FeatureCollection } from 'geojson';
import { CovidAll, HistoricalDataAll, HistoricalDataCountry } from '../utils';

export const GEODATA_SET_COUNTRY = 'GEODATA_SET_COUNTRY';
export type GeodataSetCountryAction = {
  type: typeof GEODATA_SET_COUNTRY;
  payload: string;
};

export type ErrorHttpAction = {
  status: number;
};

export const GEODATA_START_FETCHING = 'GEODATA_START_FETCHING';
export type GeodataStartFetchingAction = {
  type: typeof GEODATA_START_FETCHING;
};

export const GEODATA_STOP_FETCHING = 'GEODATA_STOP_FETCHING';
export type GeodataStopFetchingAction = {
  type: typeof GEODATA_STOP_FETCHING;
};

export const GEODATA_FILL = 'GEODATA_FILL';
export type GeodataFillAction = {
  type: typeof GEODATA_FILL;
  payload: FeatureCollection;
};

export const GEODATA_FILL_HISTORICAL = 'GEODATA_FILL_HISTORICAL';
export type GeodataFillHistoricalAction = {
  type: typeof GEODATA_FILL_HISTORICAL;
  payload: HistoricalDataAll | HistoricalDataCountry;
};

export const GEODATA_FILL_COVID_ALL = 'GEODATA_FILL_COVID_ALL';
export type GeodataFillCovidAllAction = {
  type: typeof GEODATA_FILL_COVID_ALL;
  payload: CovidAll;
};

export const GEODATA_SET_FETCHING_ERROR = 'GEODATA_SET_FETCHING_ERROR';
export type GeodataSetFetchingErrorAction = {
  type: typeof GEODATA_SET_FETCHING_ERROR;
  error: true;
  payload: ErrorHttpAction;
};

export type GeodataActionTypes =
  | GeodataSetCountryAction
  | GeodataStartFetchingAction
  | GeodataStopFetchingAction
  | GeodataFillAction
  | GeodataSetFetchingErrorAction
  | GeodataFillHistoricalAction
  | GeodataFillCovidAllAction;
