import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { adminMenu } from "./menuSidebarAdmin";
import "./SidebarAdmin.scss";
import Navigator from "../../components/Navigator";

class SidebarAdmin extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__menu">
          <div className="profile">
            <img src="https://info-imgs.vgcloud.vn/2020/12/29/14/sau-nhung-scandal-trien-mien-hot-girl-tram-anh-khang-dinh-chi-can-1-diem-tua-se-co-gang-song-het-minh.jpg" />
            <p>Jessica</p>
          </div>
          <Navigator menus={adminMenu} />

          {/* <div className="menu__items"> */}
            {/* <li className="menu__item">
              <a href="#" className="menu__item--btn">
                <i className="fas fa-desktop"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="menu__item active" id="profile">
              <a href="#profile" className="menu__item--btn">
                <i className="fas fa-users"></i>
                <span>
                  Profile <i className="fas fa-caret-down dropdown"></i>
                </span>
              </a>
              <div className="sub__menu">
                <a href="#">
                  <i className="fas fa-image"></i>
                  <span>Picture</span>
                </a>
                <a href="#">
                  <i className="far fa-address-card"></i>
                  <span>Info</span>
                </a>
              </div>
            </li>
            <li className="menu__item" id="system">
              <a href="#system" className="menu__item--btn">
                <i className="fas fa-users"></i>
                <span>
                  System <i className="fas fa-caret-down dropdown"></i>
                </span>
              </a>
              <div className="sub__menu">
                <a href="#">
                  <i className="fas fa-image"></i>
                  <span>Picture</span>
                </a>
                <a href="#">
                  <i className="far fa-address-card"></i>
                  <span>Info</span>
                </a>
              </div>
            </li> */}

            {/*  */}
            {/* <Navigator menus={adminMenu} /> */}
          {/* </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.user.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarAdmin);
