import React, { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { FaDotCircle } from "react-icons/fa";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(...registerables, ChartDataLabels);
const PowerConsumptionCard = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 90.1,
  ]);
  const [gradient, setGradiant] = useState(null);
  //Month's

  const lineChartDataset = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Power Consumption",

        data: chartData,
        lineTension: 0.3,
        fill: {
          target: "origin",
          // Area will be red above the origin

          // And blue below the origin
        },

        backgroundColor: gradient,
        borderColor: "rgba(23, 107, 181,1)",
        pointBackgroundColor: "rgba(120, 131, 151, 1)",
        pointBorderColor: "rgba(120, 131, 151, 1)",
        pointHoverBackgroundColor: "#ff6c23",
      },
    ],
  };

  const lineChartOptions = {
    // indexAxis: "y",
    plugins: {
      legend: {
        position: "top",
        align: "start",
        padding: 10,
        display: false,
      },
      datalabels: {
        color: "#fff",
        display: false,
      },

      //   title: {
      //     display: true,
      //     text: `Statistics by Category`,
      //     color: "#fff",
      //   },
    },
    color: "#fff",
    scales: {
      y: {
        ticks: {
          color: "#fff",
          mirror: false,
          stepSize: 25,
        },
        grid: {
          borderDash: [5, 10],
          color: "rgba(120, 131, 151, 0.4)",
        },
      },
      x: {
        ticks: {
          color: "#fff",
          display: true,
          mirror: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };
  useEffect(() => {
    var ctx = document.getElementById("canvas").getContext("2d");

    /*** Gradient ***/
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.6)");
    gradient.addColorStop(0, "rgba(23, 107, 181, 0.7)");

    /***************/
    if (gradient !== null) {
      setGradiant(gradient);
    }
    setChartData([10, 30, 50, 20, 5, 100, 60, 30, 66, 70, 82, 23]);
  }, []);
  return (
    <div className="w-full flex flex-col py-5 px-5 space-y-2">
      <div className="flex items-center space-x-2">
        <span>Power Consumption</span>
        <FaDotCircle className="w-[16px] h-[16px] text-red-500/70" />
      </div>
      <div className=" bg-blue-500/20 rounded-lg   ">
        <Line
          data={lineChartDataset}
          options={lineChartOptions}
          ref={chartRef}
          id="canvas"
        />
      </div>
    </div>
  );
};

export default PowerConsumptionCard;
