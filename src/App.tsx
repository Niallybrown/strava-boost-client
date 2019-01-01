import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { Action } from 'redux';
// import { ThunkDispatch } from 'redux-thunk';
import { getParameterByName } from './utils';
import { RootState } from './store/reducers';
import { typedUseSelector } from './store/conifgureStore';
import * as authActions from './store/actions/auth';
import { getAccessToken } from './utils';
import * as activitiesActions from './store/actions/activities';
import './App.css';

const accessToken = getAccessToken();

function App() {
  const activities = typedUseSelector((state: RootState) => state.activities.activities);
  const dispatch = useDispatch();
  const code = getParameterByName('code');

  useEffect(() => {
    if (!accessToken) {
      if (code) dispatch(authActions.getAuthToken(code));
    } else {
      dispatch(activitiesActions.loadActivities(1));
    }
  }, [dispatch, code]);

  return (
    <div>
      {!accessToken && (
        <div>
          <h1>Login to strava to authorize the app</h1>
          <a href="https://www.strava.com/oauth/authorize?client_id=23590&response_type=code&redirect_uri=http://localhost:3000&approval_prompt=auto&scope=activity:read">
            Authorise
          </a>
        </div>
      )}
      {activities.length ? (
        <ul>
          {activities.map((item) => (
            <li>
              {item.name} - {item.start_date}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nout t' see</p>
      )}
    </div>
  );
}

// const mapStatetoProps = ({ activities }: RootState) => ({
//   activities,
// });

// type MyExtraArg = undefined;

// const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, MyExtraArg, Action>) => ({
//   activities: (code: string) => dispatch(authActions.getAuthToken(code)),
// });

// export default connect(mapStatetoProps, mapDispatchToProps)(App);

export default App;
