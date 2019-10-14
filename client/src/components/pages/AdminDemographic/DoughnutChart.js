import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ rawData, total }) => {
  const othersValue =
    rawData && total - rawData.reduce((acc, curr) => acc + curr.sum, 0);

  if (!rawData) {
    return null;
  }

  const labels = rawData.map(item => item._id);
  const data = rawData.map(item => item.sum);

  if (othersValue > 0) {
    labels.push('Other');
    data.push(othersValue);
  }

  const maxNumber = Math.max(...rawData.map(item => item.sum));
  const barData = rawData && {
    labels,
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: ['#f5b8c6', '#9ADBF9'],

        borderWidth: 1,
        hoverBackgroundColor: ['#f19baf', '#36BEFC'],

        data,
      },
    ],
  };

  return (
    <Doughnut
      data={barData}
      options={{
        maintainAspectRatio: false,
        legend: { display: false },
        offset: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMin: 50,
                suggestedMax: Math.ceil(maxNumber + 0.2 * maxNumber),
              },
              barPercentage: 1.0,
              categoryPercentage: 0.4,
              display: false,
              offset: true,
            },
          ],
        },
      }}
    />
  );
};

export default DoughnutChart;
