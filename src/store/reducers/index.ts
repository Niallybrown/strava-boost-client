import { combineReducers } from 'redux';
import activities, { InitialState as Activities } from './activities';
import auth, { InitialState as Auth } from './auth';

export type RootState = {
  activities: Activities;
  auth: Auth;
};

const rootReducer = combineReducers({
  activities,
  auth,
});

export default rootReducer;
