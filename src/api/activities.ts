import client from './';

export const loadActivities = async (page: number) =>
  client({
    method: 'GET',
    url: `/athlete/activities?per_page=100&page=${page}`,
  });

export const getActivity = async (id: string) => {
  try {
    const activity = await client({
      method: 'GET',
      url: `/activities/${id}`,
    });
    return activity;
  } catch (err) {
    throw err;
  }
};
