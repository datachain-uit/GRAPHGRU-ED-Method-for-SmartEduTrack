import FileTable from "../components/FileTable";
import FileDetails from "../components/FileDetails";
import DataChart from "../components/DataChart";
import Header from "../components/Header";
import SearchBar from "../components/Search";
import React, { useState, useEffect } from "react";
// import "./Overview.css";
import "../styles/Overview.css";

const Overview = () => {
  // Khai báo state để lưu trữ dữ liệu lấy từ API
  const [datasetFiles, setDatasetFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/datapropertise/"
        );
        const result = await response.json();
        setDatasetFiles(result.data);

        // Chọn file đầu tiên làm mặc định (tuỳ chọn)
        if (result.data.length > 0) {
          setSelectedFile(result.data[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Hàm xử lý khi click vào một dòng
  const handleRowClick = (file) => {
    setSelectedFile(file);
  };

  // Tạo dữ liệu chi tiết từ file được chọn
  const detailData1 = selectedFile
    ? [
        ["Dataset name", selectedFile.dataset_name],
        ["Rows", selectedFile.num_rows.toLocaleString()],
        ["Columns", selectedFile.num_column],
        ["Duplications", selectedFile.num_duplicates.toLocaleString()],
        ["Missing values", selectedFile.missing_value_rate],
        ["Datatype", selectedFile.data_types.join(", ")],
      ]
    : [];

  // Hàm convert từ string "%" sang float
  const parseMissingRate = (rateString) => {
    if (!rateString) return 0;
    return parseFloat(rateString.replace("%", "")) || 0;
  };

  const allMissingRates = datasetFiles.map((file) =>
    parseMissingRate(file.missing_value_rate)
  );

  const chartData = {
    labels: datasetFiles.map((file) => file.File),
    datasets: [
      {
        label: "Missing values (%)",
        data: allMissingRates,
        backgroundColor: "rgb(166, 100, 255)",
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        ticks: { color: "#rgb(166, 100, 255)" },
      },
      x: {
        ticks: { color: "#rgb(166, 100, 255)" },
      },
    },
  };

  return (
    <div className="content" style={{ marginTop: "4px" }}>
      <div className="main-content-container">
        <div className="file-summary-container">
          <div className="title-file-summary">
            <h2 className="text-file-summary">Summarize</h2>
            {/* <input
              type="search"
              placeholder="Search..."
              className="search-input"
            /> */}
          </div>
          <div className="table-dataset">
            <FileTable
              datasetFiles={datasetFiles}
              onRowClick={handleRowClick}
              selectedFile={selectedFile}
            />
          </div>
        </div>

        {/* Detail Section */}
        <div className="file-details-container">
          <div className="detail-dataset">
            <div className="title-detail-dataset">
              <h2 className="title-text-dataset">
                Description of {selectedFile?.File || "SELECTED FILE"}
              </h2>
            </div>

            <FileDetails detailData={detailData1} />
          </div>
        </div>
        <div className="missing-values">
          <h3 className="title-chart-text">DATA VISUALIZATION CHART</h3>
          <div className="chart-container">
            <DataChart chartData={chartData} chartOptions={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
