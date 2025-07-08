import React from "react";
import {
  CCard,
  CCardBody,
  CTable,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableHead,
} from "@coreui/react";

const PropertiesTable = ({ properties }) => {
  const data = [
    { label: "Rows", value: properties?.num_row.toLocaleString() || "N/A" },
    { label: "Columns", value: properties?.num_column || "N/A" },
    {
      label: "Labels",
      value: Object.keys(properties?.label || {}).length || "N/A",
    },
    { label: "Missing rate", value: properties?.missing_value_rate || "N/A" },
    { label: "Duplicate values", value: properties?.num_duplicates || 0 },
    { label: "Data types", value: (properties?.data_types || []).join(", ") },
    { label: "Descriptive statistics", value: "Updated" },
  ];

  return (
    <CCard className="border-primary border-2 rounded-3">
      <CCardBody className="p-3">
        <CTable
          align="middle"
          className="mb-0"
          hover
          responsive
          style={{ width: "100%" }}
        >
          <CTableHead className="table-header">
            <CTableRow>
              <CTableHeaderCell scope="col">Properties</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody className="table-body">
            {data.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.label}</CTableDataCell>
                <CTableDataCell className="text-end fw-semibold">
                  {item.value}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default PropertiesTable;
