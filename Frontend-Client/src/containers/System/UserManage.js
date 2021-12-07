import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import userService from "../../services/userService";
import axios from "axios";
import ModalUser from "./ModalUser";
import ModalFunction from "./ModalFunction";

// ant design
import "antd/dist/antd.css";
import { Table, Input, Button, Space, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
// end ant design
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrData: [],
      isOpenModal: false,
      gender: 0,
      searchText: "",
      searchedColumn: "",
    };
  }

  async componentDidMount() {
    let response = await userService.getAllUsers("ALL");
    if (response !== null && response !== undefined) {
      this.setState({
        arrData: response.data,
      });
    }
    console.log("data", this.state.arrData);
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

  handleCreateUsers = () => {
    this.setState({
      isOpenModal: true
    });
  }
  // mock data

  render() {
    const arrData = this.state.arrData;
    const gender = this.state.gender;

    // 
    const data =
      arrData &&
      arrData.map((item, index) => ({
        key: index + 1,
        userName: item.userName,
        hoTen: item.hoTen,
        soDienThoai: item.soDienThoai,
        ngaySinh: item.ngaySinh,
        chucVu: item.chucVu,
        gioiTinh: item.gioiTinh,
      }));

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
        dataIndex: "",
        key: "",
        render: () => (
          <div style={{display: 'flex'}}>
            <Button type="secondary" style={{ fontWeight: "bold" }}>
              <EditOutlined />
            </Button>
            <Button type="secondary" style={{ fontWeight: "bold" }}>
              <DeleteOutlined />            
            </Button>
          </div>
        ),
      },
    ];
    return (
      <div style={{ padding: "5vw" }}>
        <ModalFunction></ModalFunction>
        <Button
          type="primary"
          onClick={() => this.handleCreateUsers(
          )}
        >
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
