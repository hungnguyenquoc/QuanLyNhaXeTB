import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./SectionLayout.scss";
class SectionLayout extends Component {
  render() {
    return (
      <div className="section__layout">
        <div className="section__one">
          <div className="section__one--title">
            <h1>“THÀNH BƯỞI - KHẲNG ĐỊNH CHẤT LƯỢNG”</h1>
            <hr></hr>
            <span>Các tuyến xe</span>
          </div>
          <div className="section__one--block">
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/routes/3_07.png"
                alt="Thanh Buoi"
              ></img>
              <div className="block__item--txt">
                <span>TP.Hồ chí minh - Đà Lạt</span>
              </div>
            </div>
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/routes/2_05.png"
                alt="Thanh Buoi"
              ></img>
              <div className="block__item--txt">
                <span>TP.Hồ chí minh - Đà Lạt</span>
              </div>
            </div>
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/routes/2_03.png"
                alt="Thanh Buoi"
              ></img>
              <div className="block__item--txt">
                <span>TP.Hồ chí minh - Đà Lạt</span>
              </div>
            </div>
          </div>
        </div>

        {/*  */}

        <div className="section__two">
          <div className="section__two--title">
            <hr></hr>
            <span>Các dịch vụ</span>
          </div>
          <div className="section__two--block">
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/menu/1_0_HOME_03.png"
                alt="Thanh Buoi"
              ></img>
              <div className="block__item--txt">
                <p>
                  Vận chuyển <br></br> hành khách
                </p>
                <a className="view__more">
                  <img src="https://thanhbuoi.com.vn/public/images/icon/add.png"></img>
                </a>
              </div>
            </div>
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/menu/menu7.png"
                alt="Thanh Buoi"
              ></img>
              <div className="block__item--txt">
                <p>
                  Vận chuyển <br></br> hàng hóa
                </p>
                <a className="view__more">
                  <img src="https://thanhbuoi.com.vn/public/images/icon/add.png"></img>
                </a>
              </div>
            </div>
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/menu/1_0_HOME_031.png"
                alt="Thanh Buoi"
              ></img>
              <div className="block__item--txt">
                <p>
                  Cho thuê các <br></br> loại xe
                </p>
                <a className="view__more">
                  <img src="https://thanhbuoi.com.vn/public/images/icon/add.png"></img>
                </a>
              </div>
            </div>
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/menu/999.png"
                alt="Thanh Buoi"
              ></img>
              <div className="block__item--txt">
                <p>
                  Chuyển tiền <br></br> nhanh
                </p>
                <a className="view__more">
                  <img src="https://thanhbuoi.com.vn/public/images/icon/add.png"></img>
                </a>
              </div>
            </div>
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/menu/1_0_HOME_032.png"
                alt="Thanh Buoi"
              ></img>
              <div className="block__item--txt">
                <p>
                  Dịch vụ <br></br> quảng cáo
                </p>
                <a className="view__more">
                  <img src="https://thanhbuoi.com.vn/public/images/icon/add.png"></img>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/*  */}

        <div className="section__three">
          <div className="section__three--title">
            <hr></hr>
            <span>HỆ THỐNG ĐỘI XE</span>
            <p className="sub__title">
              Thành Bưởi nỗ lực hoàn thiện dịch vụ và khẳng định được giá trị
              của mình trong ngành vận tải đường bộ với đội xe được đánh giá đạt{" "}
              <br></br> chất lượng hàng đầu.
            </p>
          </div>
          <div className="section__three--block">
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/fleet/xe11.gif"
                alt="Thanh Buoi"
              ></img>
            </div>
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/fleet/xe2.gif"
                alt="Thanh Buoi"
              ></img>
            </div>
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/fleet/xe3.gif"
                alt="Thanh Buoi"
              ></img>
            </div>
          </div>
        </div>

        {/*  */}

        <div className="section__four">
          <div className="section__four--title">
            <span>Lý do để bạn tin chọn Xe Khách Thành Bưởi</span>
          </div>
          <div className="section__four--block">
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/contents/thumb/1_03_thumb.png"
                alt="Thanh Buoi"
              ></img>
              <div className="block__item--txt">
                <p>Luôn luôn lắng nghe và phục vụ khách hàng 24/24</p>
              </div>
            </div>
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/contents/thumb/2_03_thumb.png"
                alt="Thanh Buoi"
              ></img>
              <div className="block__item--txt">
                <p>Hệ thống xe mới được trang bị tiện ích cao cấp, hiện đại</p>
              </div>
            </div>
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/contents/thumb/6_05_thumb.png"
                alt="Thanh Buoi"
              ></img>
              <div className="block__item--txt">
                <p>
                  Đội ngũ nhân viên, lái xe được đào tạo bài bản, phục vụ chuyên
                  nghiệp, tận tâm và lịch sự
                </p>
              </div>
            </div>
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/contents/thumb/1_0_HOME-final-_06_thumb.png"
                alt="Thanh Buoi"
              ></img>
              <div className="block__item--txt">
                <p>
                  Cách thức đặt chỗ nhanh chóng và tiện lợi, mọi lúc mọi nơi
                </p>
              </div>
            </div>
            <div className="block__item">
              <img
                src="https://thanhbuoi.com.vn/upload/contents/thumb/7_07_thumb.png"
                alt="Thanh Buoi"
              ></img>
              <div className="block__item--txt">
                <p>
                  Tần suất chuyến xe dày đặc nhất trên tuyến Đà Lạt - TP.Hồ Chí
                  Minh
                </p>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionLayout);
