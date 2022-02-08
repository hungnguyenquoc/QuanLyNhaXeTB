import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuHeaderApp";
import "./HeaderAdmin.scss";

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
    return (
      <div className="header__menu">
        <div className="title">Manage <span>Garage</span></div>
        <div className="sidebar__btn">
          <i className="fas fa-bars"></i>
        </div>
        <ul className="header__menu--icon">
          <li>
            <a href="#">
              <i className="fas fa-search"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-bell"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-power-off"></i>
            </a>
          </li>
        </ul>
      </div>
        // <div className="header-container">
        //     {/* thanh navigator */}
        //     <div className="header-tabs-container">
        //         <Navigator menus={adminMenu} />
        //     </div>
        //     <div className="languages">
        //       <span className="languages__vi">VN</span>              
        //       <span className="languages__en">EN</span>
        //     </div>
        //     {/* nút logout */}
        //     <span>{userInfo && userInfo.userName ? userInfo.userName : ''}</span>
        //     <div className="btn btn-logout" onClick={processLogout}>
        //         Log out 1
        //         <i className="fas fa-sign-out-alt"></i>
        //     </div>
        // </div>
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
