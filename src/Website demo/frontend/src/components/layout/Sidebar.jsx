import { CSidebar, CSidebarBrand, CSidebarNav, CNavItem } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilSpeedometer,
  cilColorPalette,
  cilPenNib,
  cilBrush,
  cilLockLocked,
  cilUserPlus,
  cilBarChart,
  cilChartPie,
} from "@coreui/icons";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const navLinkStyle = {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    color: "#cfd8dc",
    textDecoration: "none",
    fontSize: "16px",
    gap: "10px",
  };

  const navLinkActiveStyle = {
    backgroundColor: "#3e4b5b",
    color: "#fff",
    borderRadius: "4px",
  };

  const sectionTitleStyle = {
    color: "#90a4ae",
    fontSize: "12px",
    fontWeight: "bold",
    padding: "12px 15px 5px",
    textTransform: "uppercase",
  };

  return (
    <CSidebar
      className="vh-100"
      style={{
        backgroundColor: "#2f4050",
        color: "#fff",
        width: "240px",
      }}
    >
      <CSidebarBrand
        className="d-flex align-items-center px-3"
        style={{ height: "64px" }}
      >
        {/* <img
          src="/logo_uit_white.png"
          alt="Logo"
          style={{ width: "35px", height: "35px" }}
        /> */}
        <span
          style={{
            fontSize: "18px",
            marginLeft: "10px",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          SmartEduTrack
        </span>
      </CSidebarBrand>

      <CSidebarNav>
        {/* --- NAVIGATION --- */}
        <div style={sectionTitleStyle}>Dataset</div>
        <CNavItem>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              ...navLinkStyle,
              ...(isActive ? navLinkActiveStyle : {}),
            })}
          >
            <CIcon icon={cilChartPie} />
            Overview
          </NavLink>
          <NavLink
            to="/dataquality"
            style={({ isActive }) => ({
              ...navLinkStyle,
              ...(isActive ? navLinkActiveStyle : {}),
            })}
          >
            <CIcon icon={cilBarChart} />
            Data Quality
          </NavLink>
        </CNavItem>

        {/* --- UI COMPONENTS --- */}
        <div style={sectionTitleStyle}>Education management</div>
        <CNavItem>
          <NavLink
            to="/education"
            style={({ isActive }) => ({
              ...navLinkStyle,
              ...(isActive ? navLinkActiveStyle : {}),
            })}
          >
            <CIcon icon={cilSpeedometer} />
            Dashboard
          </NavLink>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
}

export default Sidebar;
