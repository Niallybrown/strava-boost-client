import * as types from '../actions/types';
import { UpdateObject } from '../../utils';

export type Activity = {
  [key: string]: any;
  name: string;
};

export type BestEffort = {
  [key: string]: any;
  name: string;
};

export type SortedBestEfforts = {
  [key: string]: any;
};

export type InitialState = {
  loading: boolean;
  activities: Activity[];
  error: string;
};

const activitiesJSON: any = localStorage.getItem('runs');
const activities: Activity[] =
  activitiesJSON === null ? [] : JSON.parse(activitiesJSON).activities.flat();

const initialState: InitialState = {
  loading: false,
  activities,
  error: '',
};

const updateObject: UpdateObject<InitialState> = (x, y) => {
  return { ...x, ...y };
};

export default function activitiesStore(
  state = initialState,
  action: types.ActivitiesActionTypes,
) {
  switch (action.type) {
    case types.FETCH_ACTIVITIES_REQUEST:
    case types.FETCH_ACTIVITIES_SUCCESS:
    case types.FETCH_ACTIVITIES_FAILURE:
      return updateObject(state, action.payload);
    default:
      return state;
  }
}
