import React, { useEffect, useRef, useState } from "react";
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

const TopDropCoursesChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [top5Courses, setTop5Courses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/data_week3/")
      .then((response) => response.json())
      .then((data) => {
        const users = data.data || [];
        const courseCount = {};

        users.forEach((user) => {
          if (user.classification === "E") {
            const courseKey = user.course_name || user.course_id || "Unknown";
            courseCount[courseKey] = (courseCount[courseKey] || 0) + 1;
          }
        });

        const top5 = Object.entries(courseCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([courseName, dropCount]) => ({ courseName, dropCount }));

        setTop5Courses(top5);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: top5Courses.map((item) => item.courseName),
        datasets: [
          {
            label: "Number of learners",
            data: top5Courses.map((item) => item.dropCount),
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
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return ` ${context.raw} learners`;
              },
            },
          },
        },
        scales: {
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
          },
          y: {
            beginAtZero: true,
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
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [top5Courses]); // <- vẽ chart lại mỗi khi top5Courses thay đổi

  return (
    <CCard className="mb-4">
      <CCardHeader>
        Top 5 Courses with the Highest Number of Uncompleted Learners
      </CCardHeader>
      <CCardBody style={{ height: "360px" }}>
        <canvas ref={chartRef}></canvas>
      </CCardBody>
    </CCard>
  );
};

export default TopDropCoursesChart;
