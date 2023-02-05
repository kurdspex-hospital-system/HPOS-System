import React from 'react'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
  
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#dddddd',
          font: {
            size: 16
          }
        }
      },
      tooltip: {
        bodyFont: {
          size: 16
        },
        callbacks: {
          label: function(context) {
              let label = context.label + ': ';

              if (context.parsed !== null) {
                if(props.moneyType === 'IQD') {
                  label += new Intl.NumberFormat().format(context.parsed.y) + ' IQD';
                } else {
                  label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y / props.usdValue);
                }
              }
              return label;
          }
        }
      }
    },
    scales: {
        x: {
            grid: {
                color: '#bbbbbb55'
            },
            ticks: {
                color:'#dddddd'
            }
        },
        y: {
            grid: {
                color: '#bbbbbb55'
            },
            ticks: {
                color:'#dddddd'
            }
        }
    }
  }

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Income',
        data: [15, 78, 10, -15, 5, 23, 8],
        borderColor: '#79ff84',
        backgroundColor: '#79ff84a4',
      },
      {
        label: 'Expenses',
        data: [5, -2, 25, 20, 5, 15, 2],
        borderColor: '#ff7979',
        backgroundColor: '#ff7979a4',
      },
      {
        label: 'Loan',
        data: [8, -5, 15, 10, 15, 25, 20],
        borderColor: '#fdff79',
        backgroundColor: '#fdff79a4',
      },
    ],
  };

  return (
    <div className='mb-5 mt-3'>
        <Line options={options} data={data} />
    </div>
  )
}

export default LineChart