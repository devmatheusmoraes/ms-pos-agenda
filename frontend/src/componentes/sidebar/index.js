import React, { useState } from "react";
import "./sidebar.css";
import MenuList from "../menulist";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function Sidebar() {
  const [collapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          padding: 2,
          background: colorBgContainer,
          position: "fixed",
          width: "100%",
          height: "9%",
          zIndex: 1,
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="header-logo">
            <h1>Daily Planner</h1>
        </div>
      </Header>
      <Sider
        theme="light"
        trigger={collapsed}
        collapsible
        style={{
          height: "100vh",
          position: "fixed",
          marginTop: "40px",
          left: 0,
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
          zIndex: 0,
        }}
      >
        <MenuList />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Layout
          style={{
            padding: "0 24px",
            minHeight: "100vh",
            backgroundColor: "white",
          }}
        >
          <Content
            style={{
              padding: 10,
              marginTop: 500,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Sidebar;
