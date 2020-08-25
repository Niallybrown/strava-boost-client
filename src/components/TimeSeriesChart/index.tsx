import React from 'react';
import moment from 'moment';
import Chart from 'react-apexcharts';

const oldDate = new Date('14 Nov 2012').getTime();

const TimeSeriesChart = ({
  chartData,
  minYAxis,
}: {
  chartData: [number, number][];
  minYAxis: number;
}) => {
  const series = [
    {
      data: chartData,
    },
  ];
  const options = {
    chart: {
      height: 380,
      type: 'scatter',
      zoom: {
        type: 'xy',
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 3,
      // style: 'hollow',
    },
    yaxis: {
      min: minYAxis,
      title: {
        text: 'Time (seconds)',
      },
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Date',
        offsetY: 15,
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
  };

  return (
    <div id="chart-timeline">
      <Chart options={options} series={series} type="scatter" height={400} />
    </div>
  );
};

export default TimeSeriesChart;
