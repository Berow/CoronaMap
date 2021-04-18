import { GeoJSON } from 'geojson';

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
  payload: GeoJSON;
};

export const GEODATA_SET_FETCHING_ERROR = 'GEODATA_SET_FETCHING_ERROR';
export type GeodataSetFetchingErrorAction = {
  type: typeof GEODATA_SET_FETCHING_ERROR;
  error: true;
  payload: ErrorHttpAction;
};

export type GeodataActionTypes =
  | GeodataStartFetchingAction
  | GeodataStopFetchingAction
  | GeodataFillAction
  | GeodataSetFetchingErrorAction;
