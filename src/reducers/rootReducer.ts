import { combineReducers } from 'redux';

// Reducers

import { geodataReducer } from './geoDataReducer';

export const rootReducer = combineReducers({
  geodataReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
