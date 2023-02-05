import React from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = (props) => {
  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#dddddd",
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        bodyFont: {
          size: 16,
        },
        callbacks: {
          label: function (context) {
            let label = context.dataset.label + ": ";

            if (context.parsed !== null) {
              if (props.moneyType === "IQD") {
                label += new Intl.NumberFormat().format(context.parsed.x) + " IQD";
              } else {
                label += new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(context.parsed.x / props.usdValue);
              }
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "#bbbbbb55",
        },
        ticks: {
          color: "#dddddd",
        },
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: "#dddddd",
        },
      },
    },
  };

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Income",
        data: Object.values(props.data[0]),
        borderColor: "#79ff84",
        backgroundColor: "#79ff84a4",
      },
      {
        label: "Mediator",
        data: Object.values(props.data[1]),
        borderColor: "#79efff",
        backgroundColor: "#79efffa4",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
