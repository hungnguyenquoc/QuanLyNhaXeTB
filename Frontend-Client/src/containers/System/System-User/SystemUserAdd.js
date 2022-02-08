import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import FormInput from "../../../components/Input/FormInput";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
} from "reactstrap";
class SystemUserAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoTen: "",
      ngaySinh: "",
      soDienThoai: "",
      chucVu: "",
      gioiTinh: "",
      userName: "",
      passWord: "",
      roles: [],
    };
  }

  async componentDidMount() {
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listRoles !== this.props.listRoles) {
      let arrRoles = this.props.listRoles;
      this.setState({
        roles: arrRoles,
        chucVu: arrRoles && arrRoles.length > 0 ? arrRoles[0].tenChucVu : "",
      });
    }
  }

  // handle Event
  toggle = () => {
    this.props.toggleFromParent();
  };

  onChange = (e) => {
    let copyState = {...this.state};
    this.setState({
      ...copyState,
      [e.target.name]: e.target.value
    }, () => {
      console.log('input', this.state);
    })

  };
  // handleOnChangeInput = (event, id) => {
  //   let copyState = { ...this.state };
  //   copyState[id] = event.target.value;
  //   console.log("change input", copyState[id]);
  //   this.setState(
  //     {
  //       ...copyState,
  //     },
  //     () => {
  //       console.log("check input onchange", this.state);
  //     }
  //   );
  // };

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
        this.setState({
          errMessage: "Vui lòng nhập" + arrCheck[i],
        });
        // alert("Please enter a valid" + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    // check validate input
    this.checkValidateInput();
    // fire redux action
    this.props.createNewUser({
      hoTen: this.state.hoTen,
      ngaySinh: this.state.ngaySinh,
      soDienThoai: this.state.soDienThoai,
      chucVu: this.state.chucVu,
      gioiTinh: this.state.gioiTinh,
      userName: this.state.userName,
      passWord: this.state.passWord,
    });
    console.log("submit", this.props.createNewUser);
  };

  render() {
    // khai báo các trường dữ liệu
    // const inputs = [
    //   {
    //     id: 1,
    //     name: "hoTen",
    //     type: "text",
    //     placeholder: "Họ tên",
    //     errorMessage:
    //       "Username should be 3-16 characters and shouldn't include any special character!",
    //     label: "Họ tên",
    //     pattern: "^[A-Za-z0-9]{3,16}$",
    //     required: true,
    //   },
    //   {
    //     id: 2,
    //     name: "ngaySinh",
    //     type: "date",
    //     placeholder: "Ngày sinh",
    //     label: "Ngày sinh",
    //   },
    //   {
    //     id: 4,
    //     name: "password",
    //     type: "password",
    //     placeholder: "Password",
    //     errorMessage:
    //       "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
    //     label: "Password",
    //     pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    //     required: true,
    //   },
    // ];
    let roles = this.props.listRoles;
    console.log("render role", roles);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Thêm người dùng
        </ModalHeader>
        <ModalBody>
          {/* <form action="#">
            <div className="form__group">
              <label className="form__cap">Họ tên</label>
              <div className="form__control">
                <input
                  type="text"
                  className="form__input"
                  onChange={(event) => this.handleOnChangeInput(event, "hoTen")}
                  value={this.state.hoTen}
                />
              </div>
              <FormFeedback>
                {this.state.errMessage}
              </FormFeedback>
            </div>
            <div className="form__group">
              <label className="form__cap">Ngày sinh</label>
              <div className="form__control">
                <input
                  type="text"
                  className="form__input"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "ngaySinh")
                  }
                  value={this.state.ngaySinh}
                />
                <div>{this.state.errMessage}</div>
              </div>
            </div>
            <div className="form__group">
              <label className="form__cap">Số điện thoại</label>
              <div className="form__control">
                <input
                  type="text"
                  className="form__input"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "soDienThoai")
                  }
                  value={this.state.soDienThoai}
                />
              </div>
            </div>
            <div className="form__group">
              <label className="form__cap">Chức vụ</label>
              <select
                className="form__select"
                onChange={(event) => this.handleOnChangeInput(event, "chucVu")}
                value={this.state.chucVu}
              >
                {roles &&
                  roles.length > 0 &&
                  roles.map((item, index) => {
                    return (
                      <option key={index} value={item.tenChucVu}>
                        {item.tenChucVu}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form__group">
              <label className="form__cap">Giới tính</label>
              <select
                className="form__select"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "gioiTinh")
                }
                value={this.state.gioiTinh}
              >
                <option
                  className="form__select-option"
                  value="0"
                >
                  Nam
                </option>
                <option className="form__select-option" value="1">
                  Nữ
                </option>
              </select>
            </div>
            <div className="form__group">
              <label className="form__cap">Tên tài khoản</label>
              <div className="form__control">
                <input
                  type="text"
                  className="form__input"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "userName")
                  }
                  value={this.state.userName}
                />
              </div>
            </div>
            <div className="form__group">
              <label className="form__cap">Mật khẩu</label>
              <div className="form__control">
                <input
                  type="text"
                  className="form__input"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "passWord")
                  }
                  value={this.state.passWord}
                />
              </div>
            </div>
          </form> */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.handleSaveUser()}>
            Lưu
          </Button>{" "}
          <Button onClick={function noRefCheck() {}}>Hủy</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languages: state.app.languages,
    listRoles: state.adminRedux.arrRoles,
    listGenders: state.adminRedux.arrGenders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.FetchAllUserStart()),
    getRoleStart: () => dispatch(actions.FetchRoleStart()),
    createNewUser: (data) => dispatch(actions.CreateNewUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemUserAdd);
