import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as moment from 'moment'
import {emitter} from "./../../utils/emitter";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import _ from 'lodash';
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoTen: "",
      ngaySinh: "",
      soDienThoai: "",
      chucVu: "",
      userName: "",
      passWord: "",
    };

    this.listenToEmitter();

  }

  listenToEmitter() {
    emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
      this.setState({
        hoTen: "",
        ngaySinh: "",
        soDienThoai: "",
        chucVu: "",
        userName: "",
        passWord: "",
      })
    })
  }

  componentDidMount() {
    let user = this.props.currentUser;
    // let { currentUser} = this.props;
    if(user && !_.isEmpty(user)) {
        this.setState({
          hoTen: user.hoTen,
          ngaySinh: user.ngaySinh,
          soDienThoai: user.soDienThoai,
          chucVu: user.chucVu,
          userName: user.userName,
          passWord: user.passWord,
        });
    }
    console.log('mounting modal', this.props.currentUser);
  }

  // handle Event
  toggle = () => {
    this.props.toggleFromParent();
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ['hoTen', 'ngaySinh', 'soDienThoai', 'chucVu', 'userName'];
    for( let i = 0; i < arrInput.length; i++ ) {
      console.log('check loop', this.state[arrInput[i]], arrInput[i]);
      if(!this.state[arrInput[i]]) {
        isValid = false;
        alert('miss', + arrInput[i]);
        break;
      }
    }
    return isValid;
  }

  handleOnChangeInput = (event, id) => {
    console.log("input", event.target.value, id);
    const copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("state", this.state);
      }
    );
  };

  handleSubmitForm = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.editUser(this.state);
    }
  }

  render() {
    console.log('edit user', this.props);
    console.log(this.props.isOpen);
    return (
      <>
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
            Sửa người dùng
          </ModalHeader>
          <ModalBody>
            <form action="#">
              <div className="form__group">
                <label className="form__cap">Họ tên</label>
                <div className="form__control">
                  <input
                    type="text"
                    className="form__input"
                    defaultValue="Hung NG"
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "hoTen")
                    }
                    value={this.state.hoTen}
                  />
                </div>
              </div>
              <div className="form__group">
                <label className="form__cap">Ngày sinh</label>
                <div className="form__control">
                  <input
                   
                    className="form__input"
                    defaultValue="2000-05-09"
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "ngaySinh")
                    }
                    value={this.state.ngaySinh}
                  />
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
                <div className="form__control">
                  <input
                    type="text"
                    className="form__input"
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "chucVu")
                    }
                    value={this.state.chucVu}
                  />
                </div>
                <div className="form__error--txt">
                  <span>Vui lòng nhập tên khách hàng</span>
                </div>
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

              {/* <div className="form__group">
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
              </div> */}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleSubmitForm()}>
              Lưu
            </Button>{" "}
            <Button onClick={function noRefCheck() {}}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
