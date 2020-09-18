import React from 'react';

const EditableCell: any = (props: any) => {
  console.log(props);
  // const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  // return (
  //   <td {...restProps}>
  //     {editing ? (
  //       <Form.Item
  //         name={dataIndex}
  //         style={{ margin: 0 }}
  //         rules={[
  //           {
  //             required: true,
  //             message: `Please Input ${title}!`,
  //           },
  //         ]}
  //       >
  //         {inputNode}
  //       </Form.Item>
  //     ) : (
  //       children
  //     )}
  //   </td>
  // );
  return (
    <td {...props}>
      {/* {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )} */}
    </td>
  );
};

export default EditableCell;
