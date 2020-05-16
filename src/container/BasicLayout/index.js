import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import Footer from "../../component/Footer"
import Header from "../../component/Header"
import { Layout } from "antd"
import ClientContainer from "../ClientImplementation"
import SuccessReturn from "../../component/SuccessReturn"
import "./style.scss"
import ServerContainer from "./../ServerImplementation"
const { Content } = Layout

// Define page main structure
class BasicLayout extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header />
        <Content className="main-content">
          <div className="site-layout-content">
            <Switch>
              <Redirect exact from="/" to="/client-implement" />
              <Route exact path="/client-implement">
                <ClientContainer />
              </Route>
              <Route exact path="/server-implement">
                <ServerContainer />
              </Route>
              <Route exact path="/order-complete">
                <SuccessReturn />
              </Route>
            </Switch>
          </div>
        </Content>
        <Footer />
      </Layout>
    )
  }
}

export default withRouter(BasicLayout)
