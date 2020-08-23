import React from 'react';
import moment from 'moment';
import { formatTime } from '../../utils';

interface Props {
  start_date: Date;
  name?: string;
  distance: number;
  moving_time: number;
}

const BasicActivity = React.memo(
  ({ start_date, name, distance, moving_time }: Props) => {
    return (
      <>
        <span>
          <strong>{moment(start_date).format('MMMM DD, YYYY - h:mm A')}</strong>
        </span>
        <br />
        {name && (
          <>
            <span>
              <strong>{name}</strong>
            </span>
            <br />
          </>
        )}
        {/* <span>{moment.utc(moving_time).format('HH:mm')}</span> */}
        <span>{formatTime(moving_time)}</span>
        <br />
        <br />
      </>
    );
  },
);

export default BasicActivity;
