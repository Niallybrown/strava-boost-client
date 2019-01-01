import { authToken } from '../../api/auth';
import { Dispatch } from 'redux';

import * as types from './types';

const fetchAuthRequest = (payload: types.Auth) => {
  return { type: types.FETCH_AUTH_TOKEN_REQUEST, payload };
};

const fetchAuthSuccess = (payload: types.Auth) => {
  return { type: types.FETCH_AUTH_TOKEN_SUCCESS, payload };
};

const fetchAuthFailure = (payload: types.Auth) => {
  return { type: types.FETCH_AUTH_TOKEN_FAILURE, payload };
};

export const getAuthToken = (code: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      fetchAuthRequest({
        loading: true,
        error: '',
      }),
    );
    try {
      const payload = await authToken(code);
      localStorage.setItem('token-strava', payload.data.access_token);
      return dispatch(
        fetchAuthSuccess({
          isAuthenticated: true,
          error: '',
          loading: false,
        }),
      );
    } catch (err) {
      dispatch(
        fetchAuthFailure({
          isAuthenticated: true,
          error: err,
          loading: false,
        }),
      );
    }
  };
};
