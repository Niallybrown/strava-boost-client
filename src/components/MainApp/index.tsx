import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getParameterByName } from '../../utils';
import { RootState } from '../../store/reducers';
import { typedUseSelector } from '../../store/conifgureStore';
import * as authActions from '../../store/actions/auth';
import { getAccessToken } from '../../utils';
import * as activitiesActions from '../../store/actions/activities';
import PRSelect from '../../components/Select';
import '../../App.css';
import { BestEffort, Activity } from '../../store/reducers/activities';
import sortBy from 'lodash/sortBy';
import round from 'lodash/round';
import sum from 'lodash/sum';
import moment from 'moment';
import BasicActivity from '../BasicActivity';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

const sortByProp = (activities: Activity[], prop: string) =>
  sortBy(activities, prop).reverse();
const groupResults = (activities: Activity[]) => {
  const groupedResults: { [key: string]: any } = {};
  const sortedActivities = sortBy(activities, 'start_date');
  sortedActivities.map((result) => {
    const monthYear: string = moment(result.start_date).format('YYYY/MM');
    if (groupedResults[monthYear]) {
      groupedResults[monthYear] = [...groupedResults[monthYear], result];
    } else {
      groupedResults[monthYear] = [result];
    }
    return null;
  });
  // return Object.keys(groupedResults).sort((a: string, b: string) => parseInt(a, 10) - parseInt(b, 10)).reverse().map(key => groupedResults[key]);
  return groupedResults;
};

function MainApp() {
  const accessToken = getAccessToken();
  const activities = typedUseSelector(
    (state: RootState) => state.activities.activities,
  );
  const bestEfforts = typedUseSelector(
    (state: RootState) => state.activities.bestEfforts,
  );
  const bestEffortCategories = Object.keys(bestEfforts).length
    ? Object.keys(bestEfforts)
    : [];
  const dispatch = useDispatch();
  const code = getParameterByName('code');
  const [pRCategory, setPRCatergory] = useState('');

  if (!accessToken) {
    if (code) dispatch(authActions.getAuthToken(code));
  } else {
    if (!activities.length) {
      dispatch(activitiesActions.loadActivities(1));
    }
  }

  const activitiesByMonth = groupResults(activities);
  const reverseOrderMonths: string[] = Object.keys(
    groupResults(activities),
  ).reverse();
  const aggregatedMonthData: { [key: string]: any } = {};
  reverseOrderMonths.map((item: string) => {
    const totalDistance =
      sum(activitiesByMonth[item].map((item: Activity) => item.distance)) /
      1000;
    aggregatedMonthData[item] = round(totalDistance, 2);
    return null;
  });

  return (
    <div>
      {!accessToken && !activities.length && (
        <div>
          <h1>Login to strava to authorize the app</h1>
          <a href="https://www.strava.com/oauth/authorize?client_id=23590&response_type=code&redirect_uri=http://localhost:3000&approval_prompt=auto&scope=activity:read">
            Authorise
          </a>
        </div>
      )}
      <Tabs defaultActiveKey="1">
        <TabPane tab="Fastest times" key="1">
          <span>Filtered best efforts: &nbsp;</span>
          {bestEffortCategories.length ? (
            <PRSelect
              onChange={setPRCatergory}
              options={bestEffortCategories}
            />
          ) : null}
          <ul>
            {pRCategory
              ? bestEfforts[pRCategory]
                  .filter((item: BestEffort) => item.name === pRCategory)
                  .map((item: BestEffort) => (
                    <BasicActivity
                      key={item.id}
                      start_date={item.start_date}
                      distance={item.distance}
                      moving_time={item.moving_time}
                    />
                  ))
              : null}
          </ul>
        </TabPane>
        <TabPane tab="Monthly stats" key="2">
          {Object.keys(aggregatedMonthData).map((item) => (
            <div key={item}>
              <h4 style={{ textTransform: 'uppercase' }}>
                {moment(item).format('MMMM YYYY')}
              </h4>
              <p>Total distance: {aggregatedMonthData[item]}km</p>
            </div>
          ))}
        </TabPane>
        <TabPane tab="All runs" key="3">
          {activities.length ? (
            <>
              <ul>
                {activities.map((item: Activity) => (
                  <li key={item.id}>
                    <span>{item.start_date}</span>
                    <br />
                    <span>
                      <strong>{item.name}</strong>
                    </span>
                    <br />
                    <span>{Math.round(item.distance / 1000)} km</span>
                    <br />
                    <span>{Math.round(item.moving_time / 60)} minutes</span>
                    <br />
                    <br />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Nout t' see</p>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default MainApp;
