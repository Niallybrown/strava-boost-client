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

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  const hours = Math.floor(time / 3600);
  if (hours) {
    return `${hours}:${minutes}:${seconds}`;
  } else if (minutes) {
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
  return `${seconds}s`;
};
