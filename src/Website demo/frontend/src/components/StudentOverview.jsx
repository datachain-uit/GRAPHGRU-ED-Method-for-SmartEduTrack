import React, { useEffect, useRef, useState } from "react";
import { getStyle } from "@coreui/utils";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler,
  Legend,
  Tooltip,
} from "chart.js";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler,
  Legend,
  Tooltip
);

const StudentOverview = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [monthlyCounts, setMonthlyCounts] = useState(Array(12).fill(0));

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/data_week3/")
      .then((response) => response.json())
      .then((data) => {
        const counts = Array(12).fill(0);
        data.data.forEach((user) => {
          if (user.enroll_time) {
            const month = new Date(user.enroll_time).getMonth(); // 0-11
            counts[month]++;
          }
        });
        setMonthlyCounts(counts);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      const chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ],
          datasets: [
            {
              label: "Number of learners",
              backgroundColor: "rgba(78, 115, 223, 0.1)",
              borderColor: "rgb(132, 79, 230)",
              pointBackgroundColor: "rgb(111, 66, 193)",
              pointBorderColor: "#fff",
              data: monthlyCounts,
              fill: true,
              tension: 0.2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: getStyle("--cui-body-color"),
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle("--cui-border-color-translucent"),
              },
              ticks: {
                color: getStyle("--cui-body-color"),
              },
            },
            y: {
              grid: {
                color: getStyle("--cui-border-color-translucent"),
              },
              ticks: {
                color: getStyle("--cui-body-color"),
              },
              beginAtZero: true,
            },
          },
        },
      });

      chartInstanceRef.current = chartInstance;
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.datasets[0].data = monthlyCounts;
      chartInstanceRef.current.update();
    }
  }, [monthlyCounts]);

  return (
    <CCard className="mb-4">
      <CCardHeader>Learner Trends</CCardHeader>
      <CCardBody style={{ height: "400px" }}>
        <canvas
          ref={chartRef}
          style={{ width: "100%", height: "100%" }}
        ></canvas>
      </CCardBody>
    </CCard>
  );
};

export default StudentOverview;
