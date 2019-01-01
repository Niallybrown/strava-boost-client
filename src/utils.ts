export const getParameterByName = (name: string) => {
  const url = window.location.href;
  const param = name.replace(/\\/g, '\\$&');
  const regex = new RegExp('[?&]' + param + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const getAccessToken = () => localStorage.getItem('token-strava');

type State = {
  [key: string]: any;
};

export type UpdateObject<T> = (oldState: T, updates: Partial<T>) => T;

export const updateObject = (x: State, y: State): State => {
  return { ...x, ...y };
};
