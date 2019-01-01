import * as types from '../actions/types';
import { UpdateObject } from '../../utils';

export type Activity = {
  [key: string]: any;
};

export type InitialState = {
  loading: boolean;
  activities: Activity[];
  prs?: any[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  activities: [],
  prs: [],
  error: '',
};

const updateObject: UpdateObject<InitialState> = (x, y) => {
  return { ...x, ...y };
};

export default function analysis(state = initialState, action: types.ActivitiesActionTypes) {
  switch (action.type) {
    case types.FETCH_ACTIVITIES_REQUEST:
    case types.FETCH_ACTIVITIES_SUCCESS:
    case types.FETCH_ACTIVITIES_FAILURE:
      return updateObject(state, action.payload);
    // case types.FETCH_ACTIVITY_SUCCESS: {
    //   return updateObject(state, { prs: [...state.prs, action.payload] });
    // }
    default:
      return state;
  }
}
