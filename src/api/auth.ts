import axios from 'axios';

export const authToken = (code: string) =>
  axios.post(process.env.REACT_APP_STRAVA_OAUTH_URI || '', {
    client_id: 23590,
    client_secret: '19c3d7f4c2365fb2323bcdd82c688cd19d712420',
    code,
  });
