import React from "react";
import { CSidebar, CSidebarBrand, CSidebarNav, CNavItem } from "@coreui/react";
import { cilSpeedometer, cilBook, cilSettings } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useLocation } from "react-router-dom";
import uitLogo from "../assets/uit-logo.png";
const AppSidebar = () => {
  const location = useLocation();

  return (
    <CSidebar unfoldable className="side-bar-container">
      <CSidebarBrand className="website-learning">
        <img
          src={uitLogo}
          alt="UIT Logo"
          style={{ width: "45px", height: "40px", marginRight: "10px" }}
        />
        WEBSITE LEARNING
      </CSidebarBrand>
      <CSidebarNav>
        <CNavItem
          className="overview-button"
          href="/"
          active={location.pathname === "/"}
        >
          <CIcon customClassName="nav-icon" icon={cilHome} />
          Overview
        </CNavItem>

        <CNavItem
          className="education-management"
          href="/education"
          active={location.pathname === "/education"}
        >
          <CIcon customClassName="nav-icon" icon={cilBook} />
          Education Management
        </CNavItem>

        {/* <CNavItem className="personalized-learning" href="/learning" active={location.pathname === '/learning'}>
          <CIcon customClassName="nav-icon" icon={cilSettings} />
          Personalized Learning
        </CNavItem> */}
      </CSidebarNav>
    </CSidebar>
  );
};

export default AppSidebar;
