import { combineReducers } from 'redux';
import activities, { InitialState as Activities } from './activities';

export type RootState = {
  activities: Activities;
};

const rootReducer = combineReducers({
  activities,
});

export default rootReducer;
