import AppLayout from "../components/AppLayout";
import { CRow, CCol, CButton, CFormInput, CBadge } from "@coreui/react";
import EvaluationDashboard from "../components/EvaluationDashboard";
import LabelChart from "../components/LabelChart";
import PropertiesTable from "../components/PropertiesTable";
import "../styles/Education.css";
import ColumnsTable from "../components/ColumnsTable";
import LabelCountTable from "../components/LabelCountTable";
import React, { useState, useEffect } from "react";

const DataQuality = () => {
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
    <div className="main-education" style={{ marginTop: "10px" }}>
      {/* SECTION 1: Header */}
      {/* <div className="update-container">
        <CCol md={3}>
          <CButton className="text-end" color="success">
            <div className="update-text">Update dataset</div>
          </CButton>
        </CCol>
        <input type="search" placeholder="Search..." className="search-input" />
      </div> */}

      {/* SECTION 2: Properties Table */}
      <div className="properties-container">
        <h2 className="title-properties">Dataset</h2>
        <div className="data-table" style={{ overflow: "auto" }}>
          <div className="properties-table">
            <PropertiesTable properties={datasetFiles[0]} />
          </div>
          <div className="column-table">
            <ColumnsTable columns={datasetFiles[0]?.detail_column || {}} />
          </div>
        </div>
      </div>

      {/* SECTION 3: Charts & Evaluation */}
      <div className="label-chart">
        <div className="label-chart-container">
          <LabelChart labelData={datasetFiles[0]?.label} />
        </div>
        <div className="label-table">
          <LabelCountTable labelCounts={labelCounts} />
        </div>
      </div>
      <CRow>
        <div className="eva-container">
          <EvaluationDashboard />
        </div>
      </CRow>
    </div>
  );
};

export default DataQuality;
