import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux'

export default function () {
  const hits = useSelector(state => state.main.hits.filter(i => !i.isHidden ));
  const ids = hits && hits.length && hits.map(i => i.objectID)
  const upvotes = hits && hits.length && hits.map(i => i.votes)

  return <div className="chart-container">
    <Line
      data={{
        labels: ids,
        datasets: [
          {
            borderWidth: 2,
            borderColor: "#007BFF",
            pointBackgroundColor: '#007BFF',
            data: upvotes,
            fill: false,
          }
        ]
      }}
      height={300}
      options={{
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: false,
              stepSize: 250
            },
            scaleLabel: {
              display: true,
              labelString: 'Votes',
              fontStyle: 'bold',
              fontColor: '#000',
              fontSize: 14
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 90
            },
            scaleLabel: {
              display: true,
              labelString: 'ID',
              fontStyle: 'bold',
              fontColor: '#000',
              fontSize: 14
            }
          }]
        },
        elements: {
          line: {
            tension: 0
          }
        }
      }}
    />
  </div>
}