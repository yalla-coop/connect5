import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

export const ContentWrapper = styled.div`
  max-width: 25rem;
  margin: 0 auto;
  // padding: 2rem 15px;
`;

const BarChart = ({ data, width, height, maxNumber }) => {
  return (
    <ContentWrapper>
      <Bar
        data={data}
        width={width}
        height={height}
        options={{
          title: {
            fontSize: 25,
          },
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
            xAxes: [
              {
                barPercentage: 0.5,
                barThickness: 12.8,
                maxBarThickness: 20,
                minBarLength: 10,
              },
            ],
          },
          layout: {
            padding: {
              left: 10,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
        }}
      />
    </ContentWrapper>
  );
};

export default BarChart;
