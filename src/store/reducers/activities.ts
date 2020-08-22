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
  bestEfforts: SortedBestEfforts;
  error: string;
};

const activitiesJSON: any = localStorage.getItem('runs');
const activities: Activity[] =
  activitiesJSON === null ? [] : JSON.parse(activitiesJSON).activities.flat();

const bestEfforts: BestEffort[] = activities.length
  ? activities.map((item) => item.best_efforts || []).flat()
  : [];
const sortedBestEfforts: SortedBestEfforts = {};
bestEfforts.map((item: BestEffort) =>
  sortedBestEfforts[item.name]
    ? (sortedBestEfforts[item.name] = [...sortedBestEfforts[item.name], item])
    : (sortedBestEfforts[item.name] = [item]),
);

const initialState: InitialState = {
  loading: false,
  activities: activities,
  bestEfforts: sortedBestEfforts,
  error: '',
};

const updateObject: UpdateObject<InitialState> = (x, y) => {
  return { ...x, ...y };
};

export default function analysis(
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
