import React from 'react';
import BarChart from '../../common/BarChart';

const BarComponent = ({ rawData, total }) => {
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

  const maxNumber = Math.max(...rawData.map(item => item.sum), othersValue);
  const barData = rawData && {
    labels,
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: '#9ADBF9',
        borderColor: '#9ADBF9',
        borderWidth: 1,
        hoverBackgroundColor: '#36BEFC',
        hoverBorderColor: '#36BEFC',
        data,
      },
    ],
  };

  return (
    <BarChart data={barData} width={320} height={251} maxNumber={maxNumber} />
  );
};

export default BarComponent;
