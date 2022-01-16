import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuHeaderApp";
import "./HeaderAdmin.scss";
import ReactDOM from "react-dom";


class HeaderAdmin extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    const { processLogout, language, userInfo } = this.props;
    console.log('check userinfo', userInfo);
    return (
        <div className="header-container">
            {/* thanh navigator */}
            <div className="header-tabs-container">
                <Navigator menus={adminMenu} />
            </div>
            <div className="languages">
              <span className="languages__vi">VN</span>              
              <span className="languages__en">EN</span>
            </div>
            {/* nút logout */}
            <span>{userInfo && userInfo.userName ? userInfo.userName : ''}</span>
            <div className="btn btn-logout" onClick={processLogout}>
                Log out 1
                <i className="fas fa-sign-out-alt"></i>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    // language: state.user.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAdmin);
