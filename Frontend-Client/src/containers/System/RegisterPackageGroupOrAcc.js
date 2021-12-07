import React, { Component, useState  } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Modal, Button } from "antd";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

class RegisterPackageGroupOrAcc extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visible: false,
    };
  }
  // const [isModalVisible, setIsModalVisible] = useState(false);
  showModal = () => {
    this.setState = ({
        visible: true
    })
    console.log(this.setState = ({
        visible: true
    }))
  };
  handleOk = () => {
    this.setState = ({
        visible: false
    })
  };
  handleCancel = () => {
    this.setState = ({
        visible: false
    })
  };
  render() {
    
    return (
      <>
        <Button type="primary" onClick={() => this.showModal()}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={() => this.handleOk()}
          onCancel={() => this.handleCancel()}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPackageGroupOrAcc);
