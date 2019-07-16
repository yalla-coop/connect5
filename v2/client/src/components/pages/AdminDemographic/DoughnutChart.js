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
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
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
              display: true,
              offset: true,
            },
          ],
        },
      }}
    />
  );
};

export default DoughnutChart;
