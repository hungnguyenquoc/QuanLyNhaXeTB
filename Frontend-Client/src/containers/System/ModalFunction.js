import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';

const ModalFunction = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
    return {};
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {};
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalFunction);
