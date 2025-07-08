import React, { useState } from 'react'
import AppSidebar from './AppSidebar'
import { CContainer, CHeader, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

const AppLayout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true)

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev)
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar (fixed position) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: sidebarVisible ? '250px' : '0', // Sidebar width khi visible
          height: '100vh',
          transition: 'width 0.3s ease',
          overflow: 'hidden', // Ẩn sidebar khi width = 0
          zIndex: 1000,
        }}
      >
        <AppSidebar />
      </div>

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          marginLeft: sidebarVisible ? '250px' : '0', // Khi sidebar visible
          transition: 'margin-left 0.3s ease', // Thêm hiệu ứng khi mở/đóng sidebar
        }}
      >
        <CHeader className="p-3 bg-dark text-white d-flex justify-content-between align-items-center">
          <CButton onClick={toggleSidebar} className="d-lg-none text-white">
            <CIcon icon={cilMenu} />
          </CButton>
          <div>Header</div>
        </CHeader>

        <CContainer fluid className="mt-4">
          {children}
        </CContainer>
      </div>
    </div>
  )
}

export default AppLayout
