import React from 'react';
import { CCard, CCardBody, CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMoney, cilUser, cilSchool, cilCart, cilChatBubble, cibCoursera } from '@coreui/icons'; // Import các icon cần thiết

const cardStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '15px 20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
  height: '100%', // Đảm bảo các card có cùng chiều cao
};

const valueStyles = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#333',
};

const descriptionStyles = {
  fontSize: '14px',
  color: '#666',
  marginTop: '5px',
};

const iconContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: '60px',
  height: '60px',
  color: '#fff',
  fontSize: '28px',
};

const getIconColor = (type) => {
  switch (type) {
    case 'money':
      return '#6f42c1'; // Màu tím
    case 'users':
      return '#dc3545'; // Màu đỏ
    case 'clients':
      return '#28a745'; // Màu xanh lá cây
    case 'sales':
      return '#fd7e14'; // Màu cam
    default:
      return '#007bff'; // Màu mặc định
  }
};

const getChangeColor = (value) => {
  return value >= 0 ? 'green' : 'red';
};

const InfoCard = ({ title, value, change, description, iconType }) => {
  const icon = () => {
    switch (iconType) {
      case 'money':
        return cibCoursera;
      case 'users':
        return cilUser;
      case 'clients':
        return cilChatBubble;
      case 'sales':
        return cilSchool;
      default:
        return null;
    }
  };

  return (
    <CCol xs={12} sm={6} md={3}> {/* Sử dụng CCol để chia bố cục */}
      <CCard style={cardStyles}>
        <CCardBody style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <div style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>{title}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexGrow: 1 }}>
            <div>
              <div style={valueStyles}>{value}</div>
              <div style={descriptionStyles}>
                <span style={{ color: getChangeColor(parseFloat(change)) }}>
                  {change}
                </span>{' '}
                {description}
              </div>
            </div>
            <div style={{ ...iconContainerStyles, backgroundColor: getIconColor(iconType) }}>
              <CIcon icon={icon()} />
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default InfoCard;