import React from 'react'
import { CRow, CCol, CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'

const FileDetails = ({ detailData }) => {
  return (
    <CRow className="gy-3">
      {detailData.map(([label, value], index) => (
        <CCol xs="12" sm="6" key={index}>
          <CCard className="detail-of-file">
            <CCardBody>
              <CCardTitle className="card-title">{label}</CCardTitle>
              <CCardText className="card-text">{value}</CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  )
}

export default FileDetails
