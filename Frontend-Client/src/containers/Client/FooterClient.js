import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./FooterClient.scss";
class FooterClient extends Component {
  constructor(props) {
    super(props);
    this.btnLogin = React.createRef();
  }

  render() {
    return (
      <div className="footer">
        <div className="footer__inr">
          <div className="footer__block">
            <div className="footer__block--item">
              <div className="footer__title">
                <span>
                  Giấy Chứng nhận Đăng ký kinh doanh số: 0302029252 do Sở Kế
                  hoạch đầu tư TPHCM cấp ngày 08/03/2000 Người chịu trách nhiệm:
                  Ông Lê Đức Thành
                </span>
              </div>
              <div className="footer__register">
                <img src="https://thanhbuoi.com.vn/uploads/images/bct_07.png"></img>
              </div>
            </div>
            <div className="footer__block--item">
              <div className="footer__logo">
                <img src="https://thanhbuoi.com.vn/upload/system/logo_footer_071.png"></img>
              </div>
              <hr />
              <div className="footer__info">
                <ul>
                  <li>
                    <span> Hotline:</span>
                    <span>0918 91 91 89</span>
                  </li>
                  <li>
                    <span>Fax:</span>
                    <span>02862 908 313 | MST: 0302029252 </span>
                  </li>
                  <li>
                    <span>Địa chỉ VP:</span>
                    <span>
                      Số 266 - 268 Lê Hồng Phong, Phường 4, Quận 5, Tp. Hồ Chí
                      Minh
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer__block--item">
              <div className="image__map">
                <img src="https://inuvcuon.vn/images/2018/08/voi-nhung-cong-cu-rat-huu-ich-ban-da-co-the-in-truc-tiep-ngay-tren-google-map.jpg"></img>
              </div>
            </div>
          </div>
          <div className="copyright">Copyright © 2021 Quốc Hưng</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FooterClient);
