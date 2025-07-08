import React from 'react';
import { CContainer, CRow } from '@coreui/react';
import InfoCard from './InfoCard';

const LineCard = () => {
  return (
    <CContainer>
      <CRow>
        <InfoCard
          title="TODAY'S COURSE"
          value="1,423"
          change="+10%"
          description="since yesterday"
          iconType="money"
        />
        <InfoCard
          title="TODAY'S USERS"
          value="2,300"
          change="+3%"
          description="since last week"
          iconType="users"
        />
        <InfoCard
          title="COMMENTS"
          value="+3,462"
          change="-2%"
          description="since last quarter"
          iconType="clients"
        />
        <InfoCard
          title="SCHOOLS"
          value="1,130"
          change="+5%"
          description="than last month"
          iconType="sales"
        />
      </CRow>
    </CContainer>
  );
};

export default LineCard;