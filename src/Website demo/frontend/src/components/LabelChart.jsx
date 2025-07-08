import React, { useRef, useEffect } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CCard, CCardHeader, CCardBody } from "@coreui/react";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const LabelBarChart = ({ labelData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const labels = labelData
    ? Object.values(labelData).map((item) => item.name)
    : [];
  const percentages = labelData
    ? Object.values(labelData).map((item) => item.percent)
    : [];

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Proportion (%)",
            data: percentages,
            backgroundColor: [
              "rgb(77, 46, 134)",
              "rgb(94, 56, 163)",
              "rgb(111, 66, 193)",
              "rgb(139, 83, 241)",
              "rgb(166, 100, 255)",
            ],
            borderColor: "#00000010",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color:
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--cui-body-color"
                ) || "#000",
              font: {
                family: "Inter",
                size: 14,
                weight: "bold",
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.raw}%`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: (value) => `${value}%`,
              color:
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--cui-body-color"
                ) || "#000",
            },
            grid: {
              color:
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--cui-border-color-translucent"
                ) || "#ccc",
            },
            title: {
              display: true,
              text: "Percentage (%)",
              font: {
                family: "Inter",
                size: 14,
                weight: "bold",
              },
            },
          },
          x: {
            ticks: {
              color:
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--cui-body-color"
                ) || "#000",
            },
            grid: {
              color:
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--cui-border-color-translucent"
                ) || "#ccc",
            },
            title: {
              display: true,
              text: "Labels",
              font: {
                family: "Inter",
                size: 14,
                weight: "bold",
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [labelData]);

  return (
    <CCard className="mb-4">
      <CCardHeader>Label Distribution</CCardHeader>
      <CCardBody style={{ height: "360px" }}>
        <canvas ref={chartRef}></canvas>
      </CCardBody>
    </CCard>
  );
};

export default LabelBarChart;
