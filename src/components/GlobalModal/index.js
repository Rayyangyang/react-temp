import React from 'react';
import { Modal } from 'antd';

const GlobalModal = (props) => {
  return (
    <Modal
      width="40vw"
      footer={null}
      destroyOnClose
      {...props}
    >
      {props.children}
    </Modal>
  );
};

export default GlobalModal;
