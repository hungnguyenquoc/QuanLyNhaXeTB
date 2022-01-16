import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderClient from "./HeaderClient";
import BannerClient from "./BannerClient";
import SectionLayout from "./SectionLayout";
import FooterClient from "./FooterClient";

class HomePage extends Component {

    render() {

        return (
          <div className="page">
              <HeaderClient/>
              <BannerClient/>
              <SectionLayout/>
              <FooterClient/>
          </div>  
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
