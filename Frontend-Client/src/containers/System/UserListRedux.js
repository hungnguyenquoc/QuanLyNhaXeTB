import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Table, Tag, Space } from "antd";
import roleService from "../../services/roleService";
import * as actions from "../../store/actions";
import { FetchRoleStart } from "./../../store/actions/adminReduxActions";

class UserListRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: []
    };  
  }

  async componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers
      })
    }
  }

  handleDeleteUser = (userId) => {
    this.props.deleteUserRedux(userId);
  }
  render() {
    console.log('check all users', this.props.listUsers);
    console.log('check state', this.state.usersRedux);
    let arrUsers = this.state.usersRedux;
    return (
      <>
        <table>
          <tbody>
            <tr>
              <th>Ho Ten</th>
              <th>Ngay sinh</th>
              <th>SDT</th>
              <th>Chuc vu</th>
              <th>Gioi tinh</th>
              <th></th>
            </tr>
            {
              arrUsers && arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.hoTen}</td>
                    
                    <td>{item.ngaySinh}</td>
                    
                    <td>{item.soDienThoai}</td>
                    
                    <td>{item.chucVu}</td>
                    
                    <td>{item.gioiTinh}</td>
                    
                    <td>{item.userName}</td>
                    <td>
                      <button>Edit</button>
                      <button onClick={() => this.handleDeleteUser(item)}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.adminRedux.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.FetchAllUserStart()),
    // deleteUser: (id) => dispatch(actions.deleteUser(id))
  };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(UserListRedux);
