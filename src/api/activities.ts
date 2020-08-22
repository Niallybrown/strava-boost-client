import client from './';

export const loadActivities = async (page: number) =>
  client({
    method: 'GET',
    url: `/athlete/activities?per_page=100&page=${page}`,
  });

export const getActivity = async (id: number) =>
  client({
    method: 'GET',
    url: `/activities/${id}`,
  });
