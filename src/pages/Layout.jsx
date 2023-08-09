import React from "react";
import Sidebar from "../components/Sidebar";
import "./Layout.css"; // เพิ่มไฟล์ CSS สำหรับปรับแต่งสไตล์

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="layout-container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;