import { GeoJSON } from 'geojson';
import {
  GeodataActionTypes,
  GEODATA_START_FETCHING,
  GEODATA_FILL,
  GEODATA_STOP_FETCHING,
  GEODATA_SET_FETCHING_ERROR,
  ErrorHttpAction,
} from '../types/geodataActionTypes';

export type GeodataState = {
  geoData: GeoJSON | null;
  isFetching: boolean;
  error: false | ErrorHttpAction;
};

const initialState: GeodataState = {
  geoData: null,
  isFetching: false,
  error: false,
};

export const geodataReducer = (state = initialState, action: GeodataActionTypes): GeodataState => {
  switch (action.type) {
    case GEODATA_START_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case GEODATA_STOP_FETCHING:
      return {
        ...state,
        isFetching: false,
        error: false,
      };
    case GEODATA_SET_FETCHING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GEODATA_FILL:
      return {
        ...state,
        geoData: action.payload,
        error: false,
      };
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
