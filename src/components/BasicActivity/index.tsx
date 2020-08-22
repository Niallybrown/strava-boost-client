import React from 'react';
import moment from 'moment';

interface Props {
  start_date: Date;
  name?: string;
  distance: number;
  moving_time: number;
}

const BasicActivity = React.memo(
  ({ start_date, name, distance, moving_time }: Props) => {
    console.log(moment().minutes(moving_time));
    return (
      <>
        <span>
          <strong>{moment(start_date).format('Do MMM YYYY - HH:mm')}</strong>
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
        <span>{moving_time / 1000}</span>
        <br />
        <br />
      </>
    );
  },
);

export default BasicActivity;
