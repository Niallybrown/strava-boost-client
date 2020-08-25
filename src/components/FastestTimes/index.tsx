import React, { useState } from 'react';
import moment from 'moment';
import {
  Activity,
  BestEffort,
  SortedBestEfforts,
} from '../../store/reducers/activities';
import PRSelect from '../../components/Select';
import BasicActivity from '../BasicActivity';
import TimeSeriesChart from '../TimeSeriesChart';
import { Statistic } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import { formatTime } from '../../utils';

const FastestTines = ({ activities }: { activities: Activity[] }) => {
  const [pRCategory, setPRCatergory] = useState('');
  const bestEfforts: BestEffort[] = activities.length
    ? activities.map((item) => item.best_efforts || []).flat()
    : [];

  const sortedBestEfforts: SortedBestEfforts = {};
  bestEfforts.map((item: BestEffort) =>
    sortedBestEfforts[item.name]
      ? (sortedBestEfforts[item.name] = [...sortedBestEfforts[item.name], item])
      : (sortedBestEfforts[item.name] = [item]),
  );

  const bestEffortCategories = Object.keys(sortedBestEfforts).length
    ? Object.keys(sortedBestEfforts)
    : [];

  const chartData = pRCategory
    ? sortedBestEfforts[pRCategory]
        .filter((item: BestEffort) => item.name === pRCategory)
        .map((item: Activity) => [
          parseInt(moment(item.start_date).format('x')),
          item.elapsed_time,
        ])
    : [];

  const times = chartData.map((item: [number, number]) => item[1]);

  const filteredChartData = chartData.filter(
    (item: [number, number]) => item[1] < Math.min(...times) * 2.5,
  );

  const fastestTime = Math.min(...times);

  return (
    <>
      <span
        style={{
          display: 'inline-block',
        }}
      >
        <p>Filtered best efforts: &nbsp;</p>
        {bestEffortCategories.length ? (
          <PRSelect onChange={setPRCatergory} options={bestEffortCategories} />
        ) : null}
      </span>
      {pRCategory && (
        <Statistic
          style={{
            display: 'inline-block',
            verticalAlign: 'top',
            marginLeft: '1rem',
          }}
          title="Fastest time"
          value={formatTime(fastestTime)}
          prefix={<FireOutlined />}
        />
      )}
      {pRCategory && (
        <>
          <TimeSeriesChart
            chartData={filteredChartData}
            minYAxis={fastestTime}
          />
          <ul>
            {sortedBestEfforts[pRCategory]
              .filter((item: BestEffort) => item.name === pRCategory)
              .map((item: BestEffort) => (
                <BasicActivity
                  key={item.id}
                  start_date={item.start_date}
                  distance={item.distance}
                  moving_time={item.moving_time}
                />
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default FastestTines;
