import React from 'react';
import { Button, Modal } from 'antd';
import { css } from '@emotion/core';
import { ActionType, ActionTypeProps } from 'types';
import ModalWindow from 'components/ModalWindow';

export interface IModal {
  isStudent: boolean;
  testData: {
    id: string;
    name: string;
    description: string;
    descriptionUrl: string;
    type: string[];
    timeZone: number;
    dateTime: number;
    place: string;
    comment: string;
    trainee: string;
    courseName: string;
    timeToImplementation: number;
    broadcastUrl: string;
    materialsLinks: string[];
    block: string;
    result: string;
    stack: string[];
    feedBack: string;
    taskBreakpoints: number[];
    videoLink: string;
    [propName: string]: any;
  };
}
const ModalContainer: React.FC<IModal> = props => {
  const { isStudent, testData } = props;
  const [modal2Visible, setModal2Visible] = React.useState(false);

  return (
    <div>
      <Button type="primary" onClick={() => setModal2Visible(true)}>
        Vertically centered modal dialog
      </Button>
      <Modal
        style={{ top: 20 }}
        centered
        width={`90%`}
        visible={modal2Visible}
        footer={[null, null]}
        onCancel={() => setModal2Visible(false)}
      >
        <ModalWindow testData={testData} />
      </Modal>
    </div>
  );
};

export default ModalContainer;
