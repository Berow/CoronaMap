import { FeatureCollection } from 'geojson';
import {
  GeodataActionTypes,
  GEODATA_START_FETCHING,
  GEODATA_FILL,
  GEODATA_STOP_FETCHING,
  GEODATA_SET_FETCHING_ERROR,
  ErrorHttpAction,
  GEODATA_SET_COUNTRY,
} from '../types/geodataActionTypes';
import { countryData } from '../utils';

export type GeodataState = {
  country: string;
  geoData: FeatureCollection | countryData;
  isFetching: boolean;
  error: false | ErrorHttpAction;
};

const initialState: GeodataState = {
  country: '',
  geoData: {
    type: 'FeatureCollection',
    features: [],
  },
  isFetching: false,
  error: false,
};

export const geodataReducer = (state = initialState, action: GeodataActionTypes): GeodataState => {
  switch (action.type) {
    case GEODATA_SET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
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
