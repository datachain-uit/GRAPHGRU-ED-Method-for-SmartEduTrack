import { CCard, CCardBody, CCardHeader, CFormSelect } from "@coreui/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EvaluationDashboard = () => {
  const [direct, setDirect] = useState(null);
  const [reliabilityData1, setReliabilityData1] = useState(null);
  const [relevanceData1, setRelevanceData1] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [models, setModels] = useState([]); // lưu các model name
  const [targetModel, setTargetModel] = useState(""); // model đang chọn

  const pdfRef = useRef();

  const colors = [
    "rgb(77, 46, 134)",
    "rgb(94, 56, 163)",
    "rgb(111, 66, 193)",
    "rgb(139, 83, 241)",
    "rgb(166, 100, 255)",
    "rgb(180, 120, 255)",
  ];

  const getColor = (index) => colors[index % colors.length];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/api/metrics/");
        const result = await response.json();

        const dataset = result.data.map((entry) => entry.dataset);
        const modelNames = Object.keys(
          result.data[0]?.evaluation?.accuracy || {}
        );
        setModels(modelNames); // lưu model name

        const combinedirect = [];
        combinedirect.push({
          label: "Completeness",
          backgroundColor: getColor(0),
          data: result.data.map((entry) => entry?.completeness ?? 0),
        });
        combinedirect.push({
          label: "Consistency",
          backgroundColor: getColor(1),
          data: result.data.map((entry) => entry?.consistency ?? 0),
        });
        setDirect({ labels: dataset, datasets: combinedirect });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!targetModel) return; // chưa chọn model => không cần fetch tiếp

    async function fetchAndFilterData() {
      try {
        const response = await fetch("http://localhost:8000/api/metrics/");
        const result = await response.json();

        const dataset = result.data.map((entry) => entry.dataset);

        const filteredReliability = [];
        const filteredRelevance = [];
        const filteredPerformance = [];

        filteredPerformance.push({
          label: `Macro precision - ${targetModel}`,
          backgroundColor: getColor(0),
          data: result.data.map(
            (entry) =>
              entry?.performance_model?.marcro?.macro_precision?.[
                targetModel
              ] ?? 0
          ),
        });
        filteredPerformance.push({
          label: `Macro recall - ${targetModel}`,
          backgroundColor: getColor(1),
          data: result.data.map(
            (entry) =>
              entry?.performance_model?.marcro?.macro_recall?.[targetModel] ?? 0
          ),
        });
        filteredPerformance.push({
          label: `Macro F1-score - ${targetModel}`,
          backgroundColor: getColor(2),
          data: result.data.map(
            (entry) =>
              entry?.performance_model?.marcro?.macro_f1_score?.[targetModel] ??
              0
          ),
        });

        filteredPerformance.push({
          label: `Weighted precision - ${targetModel}`,
          backgroundColor: getColor(3),
          data: result.data.map(
            (entry) =>
              entry?.performance_model?.weighted?.weighted_precision?.[
                targetModel
              ] ?? 0
          ),
        });
        filteredPerformance.push({
          label: `Weighted recall - ${targetModel}`,
          backgroundColor: getColor(4),
          data: result.data.map(
            (entry) =>
              entry?.performance_model?.weighted?.weighted_recall?.[
                targetModel
              ] ?? 0
          ),
        });
        filteredPerformance.push({
          label: `Weighted F1-score - ${targetModel}`,
          backgroundColor: getColor(5),
          data: result.data.map(
            (entry) =>
              entry?.performance_model?.weighted?.weighted_f1_score?.[
                targetModel
              ] ?? 0
          ),
        });

        filteredRelevance.push({
          label: `AUC-ROC (D) - ${targetModel}`,
          backgroundColor: getColor(0),
          data: result.data.map(
            (entry) => entry?.evaluation?.auc_roc?.label_d?.[targetModel] ?? 0
          ),
        });
        filteredRelevance.push({
          label: `AUC-ROC (E) - ${targetModel}`,
          backgroundColor: getColor(1),
          data: result.data.map(
            (entry) => entry?.evaluation?.auc_roc?.label_e?.[targetModel] ?? 0
          ),
        });

        filteredReliability.push({
          label: `Accuracy - ${targetModel}`,
          backgroundColor: getColor(0),
          data: result.data.map(
            (entry) => entry?.evaluation?.accuracy?.[targetModel] ?? 0
          ),
        });
        filteredReliability.push({
          label: `F1-score (D) - ${targetModel}`,
          backgroundColor: getColor(1),
          data: result.data.map(
            (entry) => entry?.evaluation?.f1_score?.label_d?.[targetModel] ?? 0
          ),
        });
        filteredReliability.push({
          label: `F1-score (E) - ${targetModel}`,
          backgroundColor: getColor(2),
          data: result.data.map(
            (entry) => entry?.evaluation?.f1_score?.label_e?.[targetModel] ?? 0
          ),
        });

        setReliabilityData1({ labels: dataset, datasets: filteredReliability });
        setRelevanceData1({ labels: dataset, datasets: filteredRelevance });
        setPerformance({ labels: dataset, datasets: filteredPerformance });
      } catch (error) {
        console.error("Error filtering data:", error);
      }
    }

    fetchAndFilterData();
  }, [targetModel]);

  return (
    <div ref={pdfRef}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>DIRECT EVALUATION</strong>
        </CCardHeader>
        <CCardBody>
          {direct && <Bar data={direct} options={{ responsive: true }} />}
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <span>Choose Model to Display</span>
            <CFormSelect
              style={{ width: "200px" }}
              value={targetModel}
              onChange={(e) => setTargetModel(e.target.value)}
            >
              <option value="">-- Select Model --</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </CFormSelect>
          </div>
        </CCardHeader>
      </CCard>

      {targetModel && (
        <>
          <CCard className="mb-4">
            <CCardHeader>Reliability - Accuracy + F1-Score</CCardHeader>
            <CCardBody>
              {reliabilityData1 && <Bar data={reliabilityData1} />}
            </CCardBody>
          </CCard>

          <CCard className="mb-4">
            <CCardHeader>Relevance - AUC-ROC</CCardHeader>
            <CCardBody>
              {relevanceData1 && <Bar data={relevanceData1} />}
            </CCardBody>
          </CCard>

          <CCard className="mb-4">
            <CCardHeader>Performance - Macro & Weighted</CCardHeader>
            <CCardBody>{performance && <Bar data={performance} />}</CCardBody>
          </CCard>
        </>
      )}
    </div>
  );
};

export default EvaluationDashboard;
