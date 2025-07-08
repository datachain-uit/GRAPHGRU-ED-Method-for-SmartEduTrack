import React from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";

const FileTable = ({ datasetFiles, onRowClick, selectedFile }) => {
  return (
    <div className="file-table-wrapper">
      <CTable hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>File name</CTableHeaderCell>
            <CTableHeaderCell>Missing rate</CTableHeaderCell>
            <CTableHeaderCell>Rows</CTableHeaderCell>
            <CTableHeaderCell>Columns</CTableHeaderCell>
            <CTableHeaderCell>Duplications</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {datasetFiles.map((file, index) => (
            <CTableRow
              key={index}
              onClick={() => onRowClick(file)}
              style={{
                cursor: "pointer",
                backgroundColor:
                  selectedFile?.File === file.File ? "#f0f0f0" : "inherit",
              }}
            >
              <CTableDataCell>{file.File}</CTableDataCell>
              <CTableDataCell>{file.missing_value_rate}</CTableDataCell>
              <CTableDataCell>{file.num_rows.toLocaleString()}</CTableDataCell>
              <CTableDataCell>{file.num_column}</CTableDataCell>
              <CTableDataCell>
                {file.num_duplicates.toLocaleString()}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default FileTable;
