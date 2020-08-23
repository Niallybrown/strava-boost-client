import client from './';
import { getAccessToken } from '../utils';

export const loadActivities = async (page: number) =>
  client({
    headers: { Authorization: `Bearer ${getAccessToken()}` },
    method: 'GET',
    url: `/athlete/activities?per_page=100&page=${page}`,
  });

export const getActivity = async (id: number) =>
  client({
    headers: { Authorization: `Bearer ${getAccessToken()}` },
    method: 'GET',
    url: `/activities/${id}`,
  });
