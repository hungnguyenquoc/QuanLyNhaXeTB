import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import SystemUserAdd from "./SystemUserAdd";
import userService from "../../../services/userService";

class SystemUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isOpenModal: false
    };
  }

  async componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        users: this.props.listUsers,
      });
    }
  }
  
  createNewUser = async (data) => {
    try {
      let response = await userService.createUserService(data);
      if (response !== null && response !== undefined) {
        await this.getAllUsers();
        this.setState({
          isOpenModal: false,
        });

        // emitter.emit("EVENT_CLEAR_MODAL_DATA");
      } else {
        console.log("loi api");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleCreateUser = () => {
    this.setState({
      isOpenModal: true,
    })
  }

  toggleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    })
  }


  render() {
    console.log("check state", this.state.users);
    console.log("get all user", this.props.listUsers);
    let arrUsers = this.state.users;
    return (
      <div>
        <SystemUserAdd
          isOpen = {this.state.isOpenModal}
          toggleFromParent={() => {
            this.toggleUserModal();
          }}
          createNewUser={this.createNewUser}
        />
        <div className="breadcrumb__wrapper">
          <ul className="breadcrumb">
            <li>
              <a href="#">
                <i className="fas fa-home"></i>
              </a>
            </li>
            <li>Dashboard</li>
          </ul>
        </div>
        <div className="card">
          <div className="card__header">
            <h3>Quản lý người dùng</h3>
            <button className="card__btn" onClick={() => this.handleCreateUser()}>
              <i className="fas fa-plus"></i>
              Thêm mới
            </button>
          </div>
          <div className="card__body">
            <table className="content-table">
              <thead>
                <tr>
                  <th>Tên đăng nhập</th>
                  <th>Họ và tên</th>
                  <th>Phân quyền</th>
                  <th>SĐT</th>
                  <th>Ngày sinh</th>
                  <th>Giới tính</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {arrUsers &&
                  arrUsers.length > 0 &&
                  arrUsers.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.userName}</td>
                        <td>{item.hoTen}</td>
                        <td>{item.chucVu}</td>
                        <td>{item.soDienThoai}</td>
                        <td>{item.ngaySinh}</td>
                        <td>{item.gioiTinh === 0 ? 'Nam' : 'Nữ'}</td>
                        <td>
                          <button className="card__btn blue" >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="card__btn red">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="card__footer"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languages: state.app.languages,
    listUsers: state.adminRedux.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.FetchAllUserStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemUserList);
