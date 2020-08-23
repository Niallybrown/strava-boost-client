import * as types from '../actions/types';
import { UpdateObject } from '../../utils';

export type InitialState = {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  isAuthenticated: !!localStorage.getItem('token-strava'),
  loading: false,
  error: null,
};

const updateObject: UpdateObject<InitialState> = (x, y) => {
  return { ...x, ...y };
};

export default function auth(state = initialState, action: types.AuthTypes) {
  switch (action.type) {
    case types.FETCH_AUTH_TOKEN_REQUEST:
    case types.FETCH_AUTH_TOKEN_SUCCESS:
    case types.FETCH_AUTH_TOKEN_FAILURE:
      return updateObject(state, action.payload);
    default:
      return state;
  }
}
