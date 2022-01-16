import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HeaderClient.scss";
import { FormattedMessage } from "react-intl";
import {languages} from "../../utils"
import { changeLanguageApp } from "../../store/actions";
class HeaderClient extends Component {

  changeLanguage = (language) => {
      this.props.changeLanguageAppRedux(language);
  }


  render() {
    let language = this.props.language;
    console.log('lg', language);
    return (
      <div className="header">
        <div className="header__inr">
          <nav className="navigation__left">
            <ul>
              <li>
                <a href="#">
                  <FormattedMessage id="home-header.homePage"></FormattedMessage>
                </a>
              </li>
              <li>
                <a href="#">
                  <FormattedMessage id="home-header.service"></FormattedMessage>
                </a>
              </li>
              <li>
                <a href="#">
                  <FormattedMessage id="home-header.bus-route"></FormattedMessage>
                </a>
              </li>
              <li>
                <a href="#">
                  <FormattedMessage id="home-header.bus-team"></FormattedMessage>
                </a>
              </li>
            </ul>
          </nav>
          <a className="logo">
            <img src="http://thanhbuoi.com.vn/upload/logo/thumb/Artboard_6100_thumb.png"></img>
          </a>
          <nav className="navigation__right">
            <ul>
              <li>
                <a href="#">
                  <FormattedMessage id="home-header.about-us"></FormattedMessage>
                </a>
              </li>
              <li>
                <a href="#">
                  <FormattedMessage id="home-header.recruitment"></FormattedMessage>
                </a>
              </li>
              <li>
                <a href="#">
                  <FormattedMessage id="home-header.news"></FormattedMessage>
                </a>
              </li>
              <li>
                <a href="#">
                  <FormattedMessage id="home-header.contact"></FormattedMessage>
                </a>
              </li>
            </ul>
          </nav>
          <div className="header__language">
            <a href="#" className={language === languages.VI ? 'language-vi active' : 'language-vi'} onClick={() => {this.changeLanguage(languages.VI)}}>
              <img src="http://thanhbuoi.com.vn/public/images/vn.png"></img>
            </a>
            <a href="#" className={language === languages.EN ? 'language-en active' : 'language-en'} onClick={() => {this.changeLanguage(languages.EN)}}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/England_flag.png"></img>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderClient);
