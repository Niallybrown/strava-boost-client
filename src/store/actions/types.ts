export const FETCH_ACTIVITIES_REQUEST = 'FETCH_ACTIVITIES_REQUEST';
export const FETCH_ACTIVITIES_SUCCESS = 'FETCH_ACTIVITIES_SUCCESS';
export const FETCH_ACTIVITIES_FAILURE = 'FETCH_ACTIVITIES_FAILURE';
export const FETCH_ACTIVITY_SUCCESS = 'FETCH_ACTIVITY_SUCCESS';

export const FETCH_AUTH_TOKEN_REQUEST = 'FETCH_AUTH_TOKEN_REQUEST';
export const FETCH_AUTH_TOKEN_SUCCESS = 'FETCH_AUTH_TOKEN_SUCCESS';
export const FETCH_AUTH_TOKEN_FAILURE = 'FETCH_AUTH_TOKEN_FAILURE';

export interface Auth {
  isAuthenticated?: boolean;
  loading: boolean;
  error: string;
}

interface GetAuthTokenAction {
  type: typeof FETCH_AUTH_TOKEN_REQUEST | typeof FETCH_AUTH_TOKEN_SUCCESS | typeof FETCH_AUTH_TOKEN_FAILURE;
  payload: Auth;
}

export type AuthTypes = GetAuthTokenAction;

export interface ActivitiesRequest {
  loading: boolean;
  error: string;
}

export interface ActivitiesSuccess extends ActivitiesRequest {
  activities: any[];
}

export interface ActivitiesRequestAction {
  type: typeof FETCH_ACTIVITIES_REQUEST;
  payload: ActivitiesRequest;
}

export interface ActivitiesSuccessAction {
  type: typeof FETCH_ACTIVITIES_SUCCESS;
  payload: ActivitiesSuccess;
}

export interface ActivitiesFailureAction {
  type: typeof FETCH_ACTIVITIES_FAILURE;
  payload: ActivitiesRequest;
}

export type ActivitiesActionTypes = ActivitiesRequestAction | ActivitiesSuccessAction | ActivitiesFailureAction;
