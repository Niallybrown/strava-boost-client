import React, { useState } from 'react';
import {
  Activity,
  BestEffort,
  SortedBestEfforts,
} from '../../store/reducers/activities';
import PRSelect from '../../components/Select';
import BasicActivity from '../BasicActivity';

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

  return (
    <>
      <span>Filtered best efforts: &nbsp;</span>
      {bestEffortCategories.length ? (
        <PRSelect onChange={setPRCatergory} options={bestEffortCategories} />
      ) : null}
      <ul>
        {pRCategory
          ? sortedBestEfforts[pRCategory]
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
    </>
  );
};

export default FastestTines;
