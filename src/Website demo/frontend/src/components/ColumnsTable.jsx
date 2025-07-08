import React from "react";
import { CCard, CCardBody } from "@coreui/react";


const ColumnsTable = ({ columns }) => {
  const columnEntries = Object.entries(columns || {});
  return (
    <CCard className="border-info border-2 rounded-3">
      <CCardBody>
        <h5 className="column-title">Description</h5>

        <div style={{ maxHeight: "323px", overflowY: "auto" }}>
          <table
            className="table table-bordered table-hover"
            style={{
              width: "100%",
              tableLayout: "fixed",
              fontFamily: "Inter, sans-serif",
              fontSize: "18px",
            }}
          >
            <thead
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "#f8f9fa",
              }}
            >
              <tr>
                <th style={{ width: "60%" }}>Column</th>
                <th style={{ width: "40%" }}>Type</th>
              </tr>
            </thead>
            <tbody>
              {columnEntries.map(([name, type], idx) => (
                <tr key={idx}>
                  <td>{name}</td>
                  <td>{type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default ColumnsTable;
