import React from "react";
import {
  CCard,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";

const LabelCountTable = ({ labelCounts }) => {
  return (
    <CCard className="border-info border-2 rounded-3 shadow-sm">
      <CCardBody className="p-3">
        <h6 className="label-count-title mb-3 text-center">Label Count Table</h6>
        <CTable
          responsive
          hover
          bordered
          className="align-middle text-center text-nowrap"
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          <CTableHead className="label-header bg-light fw-semibold">
            <CTableRow>
              <CTableHeaderCell style={{ width: "50%" }}>Label</CTableHeaderCell>
              <CTableHeaderCell style={{ width: "50%" }}>Count</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody className="label-body">
            {Object.entries(labelCounts).map(([label, count]) => (
              <CTableRow key={label}>
                <CTableDataCell className="py-2">{label}</CTableDataCell>
                <CTableDataCell className="py-2 fw-medium">{count.toLocaleString()}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default LabelCountTable;
