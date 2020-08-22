import React, { useState } from 'react';
import { typedUseSelector } from '../../store/conifgureStore';
import { RootState } from '../../store/reducers';
import PRSelect from '../../components/Select';
import { BestEffort } from '../../store/reducers/activities';
import BasicActivity from '../BasicActivity';

const bestEfforts = typedUseSelector(
  (state: RootState) => state.activities.bestEfforts,
);
const bestEffortCategories = Object.keys(bestEfforts).length
  ? Object.keys(bestEfforts)
  : [];

const [pRCategory, setPRCatergory] = useState('');

const FastestTines = () => (
  <>
    <span>Filtered best efforts: &nbsp;</span>
    {bestEffortCategories.length ? (
      <PRSelect onChange={setPRCatergory} options={bestEffortCategories} />
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
  </>
);

export default FastestTines;
