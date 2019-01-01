import axios from 'axios';
import { getAccessToken } from '../utils';

const client = axios.create({
  baseURL: process.env.REACT_APP_STRAVA_API_URI,
  headers: { Authorization: `Bearer ${getAccessToken()}` },
});

export default client;
