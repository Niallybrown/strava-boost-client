import { Dispatch } from 'redux';
import * as types from './types';
import * as api from '../../api/activities';

// const prs = (x) => (x.pr_count ? x : false);
// const runs = (x) => (x.type === 'Run' ? x : false);

// const compose2 = (f, g) => (x) => f(g(x));

// const runPrs = compose2(prs, runs);

export const fetchActivitiesRequest = (payload: types.ActivitiesRequest) => {
  return { type: types.FETCH_ACTIVITIES_REQUEST, payload };
};

export const fetchActivitiesSuccess = (payload: types.ActivitiesSuccess) => {
  return { type: types.FETCH_ACTIVITIES_SUCCESS, payload };
};

export const fetchActivitiesFailed = (payload: types.ActivitiesRequest) => {
  return { type: types.FETCH_ACTIVITIES_FAILURE, payload };
};

export const fetchActivitySuccess = (payload: types.ActivitySuccess) => {
  return { type: types.FETCH_ACTIVITY_SUCCESS, payload };
};

export const getActivity = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      fetchActivitiesRequest({
        loading: true,
        error: '',
      }),
    );
    try {
      const payload = await api.getActivity(id);
      const prs = payload.data.best_efforts;
      localStorage.setItem('prs', JSON.stringify({ prs }));
      dispatch(
        fetchActivitySuccess({
          loading: false,
          error: '',
          prs: payload.data.best_efforts,
        }),
      );
    } catch (err) {
      dispatch(fetchActivitiesFailed(err));
    }
  };
};

export const loadActivities = (page: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      fetchActivitiesRequest({
        loading: true,
        error: '',
      }),
    );
    try {
      let activities: any[] = [];
      const getActivities = async (page: number) => {
        const payload = await api.loadActivities(page);
        const runs = payload.data.filter((item: any) => item.type === 'Run');
        const completeActivities = await Promise.all(
          runs.map(async (run: any) => {
            const detailedRun = await api.getActivity(run.id);
            return {
              ...run,
              ...detailedRun.data,
            };
          }),
        );
        activities = [...activities, ...completeActivities];
        localStorage.setItem('runs', JSON.stringify({ activities }));
        if (payload.data.length === 100) {
          await getActivities((page += 1));
        }
      };
      await getActivities(page);
      dispatch(
        fetchActivitiesSuccess({
          loading: false,
          activities,
          error: '',
        }),
      );
    } catch (error) {
      console.debug(error);
      dispatch(
        fetchActivitiesFailed({
          loading: false,
          error: 'Could not retrieve activities',
        }),
      );
    }
  };
};
