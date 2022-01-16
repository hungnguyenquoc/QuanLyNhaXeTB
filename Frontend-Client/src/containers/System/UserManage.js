import React from "react";
import { connect } from "react-redux";
import userService from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import roleService from "../../services/roleService";
import { emitter } from "./../../utils/emitter";
// ant design
import "antd/dist/antd.css";
import { Table, Input, Button, Space, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
// end ant design

class UserManage extends React.Component {
  constructor(props) {
    super(props);
    // props của thằng con là state của thằng cha
    this.state = {
      arrData: [],
      // roleData: [],
      isOpenModal: false,
      isOpenModalEditUser: false,
      userEdit: {},
      gender: 0,
      searchText: "",
      searchedColumn: "",
    };
  }

  async componentDidMount() {
    await this.getAllUsers();
    // await this.getAllRole();
  }

  // handle Event
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="middle "
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="middle "
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="middle "
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  getAllUsers = async () => {
    let response = await userService.getAllUsers("ALL");
    if (response !== null && response !== undefined) {
      this.setState({
        arrData: response.data,
      });
    }
    console.log("data", this.state.arrData);
  };

  handleCreateUsers = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await userService.createUserService(data);
      if (response !== null && response !== undefined) {
        await this.getAllUsers();
        this.setState({
          isOpenModal: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      } else {
        console.log("loi api");
      }
    } catch (e) {
      console.log(e);
    }
    console.log("data", data);
  };

  //
  handleDeleteUser = async (userId) => {
    console.log("user", userId);
    try {
      let response = await userService.deleteUser(userId.userName);
      if (response !== null && response !== undefined) {
        await this.getAllUsers();
      } else {
        console.log("loi api");
      }
    } catch (e) {
      console.log(e);
    }
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  // edit user
  handleEditUser = (data) => {
    console.log("data edit", data);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: data,
    });
  };

  doEditUser = async (data) => {
    try {
      let response = await userService.updateUser(data.userName);
      if (response !== null && response !== undefined) {
        await this.getAllUsers();
        this.setState({
          isOpenModalEditUser: false,
        });
      } else {
        console.log("loi api");
      }
    } catch (e) {
      console.log("data edit do", data);
    }
  };

  // // role
  // getAllRole = async () => {
  //   let response = await roleService.getAllRole("ALL");
  //   if (response !== null && response !== undefined) {
  //     this.setState({
  //       roleData: response.data,
  //     });
  //   }
  //   console.log("data role", this.state.roleData);
  // };

  render() {
    const arrData = this.state.arrData;
    console.log("render", arrData);
    // const roleData = this.state.roleData;
    // console.log("render role", roleData);

    //
    const data =
      arrData &&
      arrData.map((item, index) => ({
        item: item,
        key: index + 1,
        userName: item.userName,
        hoTen: item.hoTen,
        soDienThoai: item.soDienThoai,
        ngaySinh: item.ngaySinh,
        chucVu: item.chucVu.tenChucVu,
        gioiTinh: item.gioiTinh,
      }));
    console.log("data list", data);
    //
    const columns = [
      {
        title: "STT",
        dataIndex: "key",
        key: "key",
        width: "",
        ...this.getColumnSearchProps("key"),
      },
      {
        title: "Tên tài khoản",
        dataIndex: "userName",
        key: "userName",
        width: "",
      },
      {
        title: "Họ và tên",
        dataIndex: "hoTen",
        key: "hoTen",
      },
      {
        title: "SĐT",
        dataIndex: "soDienThoai",
        key: "soDienThoai",
      },
      {
        title: "Ngày sinh",
        dataIndex: "ngaySinh",
        key: "ngaySinh",
      },
      {
        title: "Phân quyền",
        dataIndex: "chucVu",
        key: "chucVu",
      },
      {
        title: "Giới tính",
        dataIndex: "gioiTinh",
        key: "gioiTinh",
      },
      {
        title: "",
        dataIndex: "item",
        key: "item",
        render: (item) => (
          <div style={{ display: "flex" }}>
            <Button
              type="secondary"
              style={{ fontWeight: "bold" }}
              onClick={() => {
                this.handleEditUser(item);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              type="secondary"
              style={{ fontWeight: "bold" }}
              onClick={() => {
                this.handleDeleteUser(item);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        ),
      },
    ];
    return (
      <div style={{ padding: "5vw" }}>
        <ModalUser
          isOpen={this.state.isOpenModal}
          toggleFromParent={() => {
            this.toggleUserModal();
          }}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={() => {
              this.toggleEditUserModal();
            }}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <Button type="primary" onClick={() => this.handleCreateUsers()}>
          Tạo mới
        </Button>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
