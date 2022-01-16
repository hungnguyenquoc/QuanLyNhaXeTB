import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Table, Tag, Space } from "antd";
import roleService from "../../services/roleService";
import * as actions from "../../store/actions";
import { FetchRoleStart } from "./../../store/actions/adminReduxActions";
import UserListRedux from './UserListRedux';

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrRoles: [],
      previewAvatar: "",
      hoTen: "",
      ngaySinh: "",
      soDienThoai: "",
      chucVu: "",
      gioiTinh: "",
      userName: "",
      passWord: "",
    };
  }

  async componentDidMount() {
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        arrRoles: arrRoles,
        chucVu: arrRoles && arrRoles.length > 0 ? arrRoles[0].tenChucVu : "",
      });
    }
  }

  handleSaveUser = () => {
    // check validate input
    // fire redux action
    this.props.createNewUser({
      hoTen: this.state.hoTen,
      ngaySinh: this.state.ngaySinh,
      soDienThoai: this.state.soDienThoai,
      chucVu: this.state.chucVu,
      gioiTinh: this.state.gioiTinh,
      userName: this.state.userName,
      passWord: this.state.passWord
    })
    console.log('submit', this.props.createNewUser)
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "hoTen",
      "ngaySinh",
      "soDienThoai",
      "chucVu",
      "gioiTinh",
      "userName",
      "passWord",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("Please enter a valid", +arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    console.log("input value", copyState[id]);
    this.setState({
      ...copyState,
    });
  };

  render() {
    let roles = this.props.arrRoles;
    let isLoading = this.props.isLoading;
    let { hoTen, ngaySinh, soDienThoai, chucVu, gioiTinh, userName, passWord } =
      this.state;

    console.log("loading", isLoading);
    console.log("arr role", roles);
    console.log("check props from redux", this.props.arrRoles);
    return (
      <>
        <div className="loading">{isLoading === true ? "Loading" : ""}</div>
        <div>
          <div className="form__group">
            <label className="form__cap">Họ tên</label>
            <div className="form__control">
              <input
                type="text"
                className="form__input"
                onChange={(event) => this.handleOnChangeInput(event, "hoTen")}
                value={hoTen}
              />
            </div>
          </div>
          <div className="form__group">
            <label className="form__cap">Ngày sinh</label>
            <div className="form__control">
              <input
                type="text"
                className="form__input"
                onChange={(event) => this.handleOnChangeInput(event, "ngaySinh")}
                value={ngaySinh}
              />
            </div>
          </div>
          <div className="form__group">
            <label className="form__cap">Số Điện Thoại</label>
            <div className="form__control">
              <input
                type="text"
                className="form__input"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "soDienThoai")
                }
                value={soDienThoai}
              />
            </div>
          </div>
          <div className="form__group">
            <label className="form__cap">Chức Vụ</label>
            <div >
              <select
                className="form__control"
                onChange={(event) => this.handleOnChangeInput(event, "chucVu")}
                value={chucVu}
              >
              {roles && roles.length > 0 &&
                roles.map((item, index) => {
                  return (
                    <option key={index}>
                      {item.tenChucVu}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form__group">
            <label className="form__cap">Giới Tính</label>
            <select 
                className="form__control"
                onChange={(event) => this.handleOnChangeInput(event, "gioiTinh")}
                value={gioiTinh}
            >
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
            </select>
          </div>
          <div className="form__group">
            <label className="form__cap">Tên tài khoản</label>
            <div className="form__control">
              <input
                type="text"
                className="form__input"
                onChange={(event) => this.handleOnChangeInput(event, "userName")}
                value={userName}
              />
            </div>
          </div>
          <div className="form__group">
            <label className="form__cap">PassWord</label>
            <div className="form__control">
              <input
                type="text"
                className="form__input"
                onChange={(event) => this.handleOnChangeInput(event, "passWord")}
                value={passWord}
              />
            </div>
          </div>
          <div className="form__group">
            <button onClick={() => this.handleSaveUser()}>
              Save
            </button>
          </div>
        </div>
        <UserListRedux/>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languages: state.app.languages,
    arrRoles: state.adminRedux.arrRoles,
    isLoading: state.adminRedux.isLoading,
    listUsers: state.adminRedux.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoleStart: () => dispatch(actions.FetchRoleStart()),
    createNewUser: (data) => dispatch(actions.CreateNewUser(data)),
    fetchUserRedux: () => dispatch(actions.FetchAllUserStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
