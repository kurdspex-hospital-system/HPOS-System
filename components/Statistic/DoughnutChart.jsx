import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import style from './DoughnutChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = (props) => {
  const data = {
    labels: props.labels,
    datasets: [{
        data: props.data,
        backgroundColor: [
          "#79ff84a4",
          "#fdff79a4",
          "#79efffa4",
          "#ffbc79a4",
          "#79a1ffa4",
          '#e28743a4',
          '#063970a4',
          '#eeeee4a4',
          '#873e23a4'
        ],
        borderColor: "#19191b",
        hoverOffset: 8,
        cutout: '75%'
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: !props.noLegend,
        position: props.right ? 'right' : 'top',
        labels: {
          color: '#dddddd',
          font: {
            size: 16
          }
        }
      },
      tooltip: {
        bodyFont: {
          size: 18
        },
        callbacks: {
          label: function(context) {
              let label = context.label + ': ';

              if (context.parsed !== null) {
                if(props.moneyType) {
                  if(props.moneyType === 'IQD') {
                    label += new Intl.NumberFormat().format(context.parsed) + ' IQD';
                  } else {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed / props.usdValue);
                  }
                } else {
                  label +=context.parsed + ' Operations';
                }
              }

              label += ' (' + ((context.parsed / context.chart._metasets[0].total) * 100).toFixed(2) + '%)'
              return label;
          }
        }
      }
    }
  }

  return (
    <div id={style.chart} className={props.className}>
      <Doughnut options={options} data={data} />
    </div>
  );
};

export default DoughnutChart;
