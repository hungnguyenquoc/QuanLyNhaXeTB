import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Modal, Button } from "antd";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
  }

  showModal = () => {
    this.setState = ({
      isModalVisible: true
    })
    console.log(this.setState = ({
      isModalVisible: true
    }))
  };
  handleOk = () => {
    this.setState = ({
      isModalVisible: false
    })
  };
  handleCancel = () => {
    this.setState = ({
      isModalVisible: false
    })
  };

  render() {
    console.log('check', this.props);
    console.log('check 2', this.props.isOpen);
    return (
      <>
        <div>lfsdsfdsdfafd</div>
        <Button type="primary" onClick={() => this.showModal()}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.isModalVisible}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
