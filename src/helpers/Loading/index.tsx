import React from 'react';
import { Spin, Modal } from 'antd';

const Loading = () => {
  return (
    <Modal
      footer={null}
      visible
      centered
      closable={false}
      maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
      width={0}
    >
      <Spin size="large" />
    </Modal>
  );
};

export default Loading;
