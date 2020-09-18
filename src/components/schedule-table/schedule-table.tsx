import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Space, Input, Spin } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { TYPES_WITH_COLORS, FILTERS } from 'constants/dataForTable';
import { css } from '@emotion/core';
import TestBackend from '../test-backend';

const ScheduleTable = (props: any) => {
  const { getEvents, eventsData, loading } = props;

  const initialSelect: any[] = [];

  const [selectedRowKeys, setSelectedRowKeys] = useState(initialSelect);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    let newData: any = eventsData.map((item: any) => {
      item.key = item.id;
      return item;
    });
    setData(newData);
  }, [eventsData]);

  const onClickRow = (record: { key: string }) => {
    const { key } = record;
    const newSelectedRowKeys: {}[] = [...selectedRowKeys];
    const index = newSelectedRowKeys.findIndex((item: any) => {
      return item === key;
    });
    newSelectedRowKeys.includes(key) ? newSelectedRowKeys.splice(index, 1) : newSelectedRowKeys.push(key);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={node => {
          //   this.searchInput = node;
          // }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    // onFilterDropdownVisibleChange: (visible: boolean) => {
    //   if (visible) {
    //     setTimeout(() => this.searchInput.select(), 100);
    //   }
    // },
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  });

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    // this.setState({
    //   searchText: selectedKeys[0],
    //   searchedColumn: dataIndex,
    // });
    (() => {
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    })();
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    // this.setState({ searchText: '' });
    setSearchText('');
  };

  const columns = [
    {
      title: 'Date/time',
      dataIndex: 'dateTime',
      width: 120,
      key: 'dateTime',
      sorter: (a: any, b: any) => Date.parse(a.dateTime) - Date.parse(b.dateTime)
      // fixed: 'left',
    },
    {
      title: 'Blocks',
      dataIndex: 'block',
      key: 'block',
      width: 180
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: FILTERS,
      width: 150,
      onFilter: (value: any, record: any) => record.type.toLowerCase() === value,
      render: (type: any) => {
        return (
          <span>
            <Tag color={TYPES_WITH_COLORS[type]} key={type}>
              {type.replace(/([A-Z])/g, ' $1').toUpperCase()}
            </Tag>
          </span>
        );
      }
    },
    {
      title: 'Task',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      render: (text: string, itemData: any) => <a href={`${itemData.descriptionUrl}`}>{text}</a>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Place',
      dataIndex: 'place',
      key: 'place'
    },
    {
      title: 'Time Theory & practice',
      dataIndex: 'timeToComplete',
      key: 'timeToComplete'
    },
    {
      title: 'Trainee',
      dataIndex: 'trainee',
      key: 'trainee',
      ...getColumnSearchProps('trainee')
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result'
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a>Hide</a>
    }
  ];

  if (loading && data.length === 0) return <Spin />;

  return (
    <div className="schedule-table-container" css={container}>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onRow={(record: any, rowIndex: any) => {
          return {
            onClick: () => onClickRow(record)
          };
        }}
        scroll={{ x: 1500, y: 900 }}
      ></Table>
      <TestBackend />
    </div>
  );
};

export default ScheduleTable;

const container = css`
  margin: 20px;
`;
