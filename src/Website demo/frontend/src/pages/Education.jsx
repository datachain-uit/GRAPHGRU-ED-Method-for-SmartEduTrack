import "../styles/Education.css";
import React, { useState, useEffect } from "react";
import LineCard from "../components/LineCard";
import StudentOverview from "../components/StudentOverview";
import StudentTable from "../components/StudentTable";
import DropLearnerTable from "../components/DropLearnerChart";


const Education = () => {
  const [datasetFiles, setDatasetFiles] = useState([]);
  const [labelCounts, setLabelCounts] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/student_perf/");
        const result = await response.json();

        setDatasetFiles(result.data);

        // Extract label counts from the response
        const labelData = result.data[0]?.label;
        if (labelData) {
          const newLabelCounts = {
            A: labelData.label_a?.value || 0,
            B: labelData.label_b?.value || 0,
            C: labelData.label_c?.value || 0,
            D: labelData.label_d?.value || 0,
            E: labelData.label_e?.value || 0,
          };
          setLabelCounts(newLabelCounts);
        }

        console.log("API result:", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-education" style={{marginTop: "4px"}}>
      <div className="infocard-container">
        <LineCard />
      </div>
      <div className="chart-container">
        <StudentOverview/>
      </div>

      <div className="student-table">
        <StudentTable/>
      </div>

      <div className="drop-learner-chart">
        <DropLearnerTable/>
      </div>
    </div>
  );
};

export default Education;
