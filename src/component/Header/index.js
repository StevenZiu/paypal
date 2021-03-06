import React, { useState, useEffect } from "react"
import { Layout, Menu } from "antd"
import "./style.scss"
import { withRouter } from "react-router-dom"
const { Header } = Layout

const HeaderWrapper = (props) => {
  const [activeTab, setActiveTab] = useState(null)
  const toClient = () => {
    props.history.push("client-implement")
  }
  const toServer = () => {
    props.history.push("server-implement")
  }

  useEffect(() => {
    console.log(props)
    if (props.location.pathname === "/server-implement") {
      document.getElementById("server").classList.add("ant-menu-item-selected")
      document
        .getElementById("client")
        .classList.remove("ant-menu-item-selected")
    } else if (props.location.pathname === "/client-implement") {
      document.getElementById("client").classList.add("ant-menu-item-selected")
      document
        .getElementById("server")
        .classList.remove("ant-menu-item-selected")
    }
  })
  return (
    <Header className="header">
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[activeTab]}>
        <Menu.Item key="1" onClick={toClient} id="client">
          Client Side Implementation
        </Menu.Item>
        <Menu.Item key="2" onClick={toServer} id="server">
          Server Side Implementation
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default withRouter(HeaderWrapper)
