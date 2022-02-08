import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/UserRedux";
import SystemUserList from "../containers/System/System-User/SystemUserList";

import ProductManage from "../containers/System/ProductManage";
import RegisterPackageGroupOrAcc from "../containers/System/RegisterPackageGroupOrAcc";
import HeaderAdmin from "./../containers/Header-Admin/HeaderAdmin";
import SidebarAdmin from "./../containers/Sidebar-Admin/SidebarAdmin";
import './System.scss';

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    console.log('check login admin', systemMenuPath, isLoggedIn);
    return (
      <React.Fragment>
        {isLoggedIn && <HeaderAdmin />}
        <SidebarAdmin />
        <div className="main__container">
        <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/system-user-list" component={SystemUserList} />
              <Route path="/system/product-manage" component={ProductManage} />

              <Route
                path="/system/register-package-group-or-account"
                component={RegisterPackageGroupOrAcc}
              />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
        </div>
        {/* <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/product-manage" component={ProductManage} />
              <Route
                path="/system/register-package-group-or-account"
                component={RegisterPackageGroupOrAcc}
              />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
