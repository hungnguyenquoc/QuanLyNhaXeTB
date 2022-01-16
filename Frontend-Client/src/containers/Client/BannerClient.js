import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./BannerClient.scss";
class BannerClient extends Component {
  render() {
    return (
      <div className="banner">
        <div className="banner__inr">
            <img src="https://thanhbuoi.com.vn/upload/slide/cb79b3df3527ce799736.jpg" alt="banner" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerClient);
