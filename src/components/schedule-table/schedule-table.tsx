import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Space, Input, Spin, Select, Calendar } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { TYPES_WITH_COLORS, FILTERS } from 'constants/dataForTable';
import { IEvent } from '../../services/events-service';
import { css } from '@emotion/core';
import TestBackend from '../test-backend';
import Item from 'antd/lib/list/Item';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

const ScheduleTable = (props: any) => {
  const { getEvents, eventsData, loading, isStudent, timeZone, course, addNewEvent, deleteEvent } = props;
  console.log(isStudent, timeZone, course);
  const initialSelect: any[] = [];
  const optionsForSelect = [
    { value: 'Date/time' },
    { value: 'Course' },
    { value: 'Blocks' },
    { value: 'Type' },
    { value: 'Task' },
    { value: 'Description' },
    { value: 'Place' },
    { value: 'Time Theory & practice' },
    { value: 'Trainee' },
    { value: 'Materials' },
    { value: 'Result' },
    { value: 'Comment' },
    { value: 'Action' }
  ];

  const optionsForTagsSelect = [
    { value: 'deadLine' },
    { value: 'Course' },
    { value: 'Blocks' },
    { value: 'Type' },
    { value: 'Task' },
    { value: 'Description' },
    { value: 'Place' },
    { value: 'Time Theory & practice' },
    { value: 'Trainee' },
    { value: 'Materials' },
    { value: 'Result' },
    { value: 'Comment' },
    { value: 'Action' }
  ];

  const initialObj: any = {};

  const [selectedRowKeys, setSelectedRowKeys] = useState(initialSelect);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const [options, setOptions] = useState(optionsForSelect);
  const [tagOptions, setTagOptions] = useState(optionsForTagsSelect);
  const [hideRows, setHideRows] = useState(initialSelect);

  const [editableEvent, setEditableEvent] = useState(initialObj);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    let newData: any = eventsData.map((item: any) => {
      const options = {
        year: 'numeric',
        day: 'numeric',
        month: 'numeric'
      };
      item.key = item.id;
      item.dateTime = new Date(item.dateTime + timeZone * 3600000).toLocaleString('en-GB', options);
      return item;
    });
    setData(newData);
  }, [eventsData]);

  const handleChange = (row: string, block: any, event: any) => {
    setEditableEvent({
      ...editableEvent,
      [block]: event.target.value
    });
  };

  const onClickRow = (record: { key: string }, event: any) => {
    if (event.target.classList.contains('button-hide') || event.target.classList.contains('button-delete')) {
      return;
    }
    const { key } = record;
    let newSelectedRowKeys: {}[] = [...selectedRowKeys];
    const index = newSelectedRowKeys.findIndex((item: any) => {
      return item === key;
    });
    if (event.shiftKey) {
      newSelectedRowKeys.includes(key) ? newSelectedRowKeys.splice(index, 1) : newSelectedRowKeys.push(key);
      setSelectedRowKeys(newSelectedRowKeys);
      return;
    }
    if (newSelectedRowKeys.length !== 0 && newSelectedRowKeys.includes(key)) {
      newSelectedRowKeys = [];
      setSelectedRowKeys(newSelectedRowKeys);
      return;
    }
    newSelectedRowKeys = [];
    newSelectedRowKeys.push(key);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const transformRow = (row: any) => {
    const newDataItem: any = {};
    for (let key in row) {
      if (key === 'key') {
        newDataItem[key] = row.key;
        continue;
      }
      newDataItem[key] = '';
    }
    return newDataItem;
  };

  function onPanelChange(value: any, mode: any) {
    console.log(value, mode);
  }

  const hideHandle = (row: { [propName: string]: any }) => {
    const newData: any = [...data];
    const newHideRows: any = [...hideRows];
    const index = newData.findIndex((item: { [propName: string]: any }) => item.key === row.key);
    console.log('newHideRows', newHideRows);
    const hideRowKeys = newHideRows.map((item: any) => item.key);

    if (!selectedRowKeys.includes(row.key)) {
      console.log('non');
      if (hideRowKeys.includes(row.key)) {
        const showRow = newHideRows.find((item: any) => item.key === row.key);
        const idx = newHideRows.findIndex((item: any) => item.key === row.key);
        newData[index] = showRow;
        newHideRows.splice(idx, 1);
        setHideRows(newHideRows);
        setData(newData);
        setSelectedRowKeys([]);
        return;
      }

      const newDataItem: any = transformRow(row);
      newHideRows.push(newData[index]);
      newData[index] = newDataItem;
      setHideRows(newHideRows);
      setData(newData);
      setSelectedRowKeys([]);
    }

    if (selectedRowKeys.includes(row.key)) {
      if (hideRowKeys.includes(row.key)) {
        newData.forEach((dataItem: any, index: number) => {
          if (selectedRowKeys.includes(dataItem.key) && hideRowKeys.includes(dataItem.key)) {
            const showRow = newHideRows.find((item: any) => item.key === dataItem.key);
            const idx = newHideRows.findIndex((item: any) => item.key === dataItem.key);
            newData[index] = showRow;
            newHideRows.splice(idx, 1);
          }
        });
        setHideRows(newHideRows);
        setData(newData);
        setSelectedRowKeys([]);
        return;
      }

      newData.forEach((dataItem: any, index: number) => {
        if (selectedRowKeys.includes(dataItem.key) && !hideRowKeys.includes(dataItem.key)) {
          const hideItem: any = transformRow(dataItem);
          newHideRows.push(dataItem);
          newData[index] = hideItem;
        }
      });
      setHideRows(newHideRows);
      setData(newData);
      setSelectedRowKeys([]);
    }
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

  const columns: any = [
    {
      title: 'Date/time',
      dataIndex: 'dateTime',
      width: 120,
      key: 'dateTime',
      sorter: (a: any, b: any) => Date.parse(a.dateTime) - Date.parse(b.dateTime),
      render: (block: any, row: any) => {
        console.log();
        return (
          <>
            {block}
            {/* {editableEvent && editableEvent.id === row.id && <div className="site-calendar-demo-card" style={{ position: 'absolute', top: '100%', left: '0' }}>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>} */}
          </>
        );
      }
    },
    {
      title: 'Course',
      dataIndex: 'courseName',
      key: 'courseName',
      width: 120
    },
    {
      title: 'Blocks',
      dataIndex: 'block',
      key: 'block',
      width: 180,
      render: (block: any, row: any) => {
        console.log();
        if (editableEvent && editableEvent.id === row.id) {
          return <TextArea value={editableEvent.block} onChange={(event: any) => handleChange(row, 'block', event)} />;
        }
        return <span>{block}</span>;
      }
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: FILTERS,
      width: 150,
      onFilter: (value: any, record: any) => record.type.toLowerCase() === value.toLowerCase(),
      render: (tags: any, row: any) => {
        if (editableEvent && editableEvent.id === row.id) {
          // return <TextArea value={editableEvent.place} onChange={(event: any) => handleChange(row, 'place', event)} />
          const tagsOptions = tags.reduce((acc: any, tag: any) => {
            acc.push(tag);
            return acc;
          }, []);

          return (
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              options={tagOptions}
              defaultValue={tagsOptions}
              onSelect={option => {
                const newTagOptions = [...tagOptions];
                newTagOptions.push({ value: option });
                setTagOptions(newTagOptions);
              }}
            />
          );
        }
        return (
          <>
            {tags.map((tag: string) => {
              let color = TYPES_WITH_COLORS[tag];
              return (
                <Tag color={color} key={tag} style={{ border: '0px' }}>
                  {tag.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </Tag>
              );
            })}
          </>
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
      key: 'description',
      render: (block: any, row: any) => {
        console.log();
        if (editableEvent && editableEvent.id === row.id) {
          return (
            <TextArea
              value={editableEvent.description}
              onChange={(event: any) => handleChange(row, 'description', event)}
            />
          );
        }
        return <span>{block}</span>;
      }
    },
    {
      title: 'Place',
      dataIndex: 'place',
      key: 'place',
      render: (block: any, row: any) => {
        console.log();
        if (editableEvent && editableEvent.id === row.id) {
          return <TextArea value={editableEvent.place} onChange={(event: any) => handleChange(row, 'place', event)} />;
        }
        return <span>{block}</span>;
      }
    },
    {
      title: 'Time Theory & practice',
      dataIndex: 'timeToImplementation',
      key: 'timeToImplementation'
    },
    {
      title: 'Materials',
      dataIndex: 'materialsLinks',
      key: 'materialsLinks',
      render: (links: any) => {
        if (typeof links === 'object') {
          return links.map((link: string) => <span>{link}</span>);
        }
      }
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
      key: 'result',
      render: (block: any, row: any) => {
        console.log();
        if (editableEvent && editableEvent.id === row.id) {
          return (
            <TextArea value={editableEvent.result} onChange={(event: any) => handleChange(row, 'result', event)} />
          );
        }
        return <span>{block}</span>;
      }
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      render: (block: any, row: any) => {
        console.log();
        if (editableEvent && editableEvent.id === row.id) {
          return (
            <TextArea value={editableEvent.comment} onChange={(event: any) => handleChange(row, 'comment', event)} />
          );
        }
        return <span>{block}</span>;
      }
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      height: 500,
      render: (props: any) => (
        <Space size="middle">
          <a className="button-hide" onClick={() => hideHandle(props)}>
            {hideRows.some(item => item.key === props.key) ? 'Show' : 'Hide'}
          </a>
          {!isStudent && (
            <a className="button-delete" onClick={() => deleteEvent(props.id)}>
              Delete
            </a>
          )}
          {!isStudent && (
            <a
              className="button-edit"
              onClick={() => {
                setEditableEvent(props);
              }}
            >
              Edit
            </a>
          )}
        </Space>
      )
    }
  ].filter((item: any) => options.reduce((acc: any, item) => acc.concat(item.value), []).includes(item.title));

  function tagRender(props: any) {
    const { label, value, closable, onClose } = props;

    if (loading && data.length === 0) return <Spin />;

    return (
      <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  }

  return (
    <div className="schedule-table-container" css={container}>
      <Select
        mode="multiple"
        showArrow
        tagRender={tagRender}
        size="large"
        defaultValue={columns.reduce((acc: any, item: any) => {
          acc.push(item.title);
          return acc;
        }, [])}
        style={{ width: '100%' }}
        options={optionsForSelect}
        onSelect={option => {
          const newOptions = [...options];
          newOptions.push({ value: option });
          setOptions(newOptions);
        }}
        onDeselect={option => {
          const newOptions = [...options];
          const index = newOptions.findIndex(item => item.value === option);
          newOptions.splice(index, 1);
          setOptions(newOptions);
        }}
      ></Select>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        bordered
        onRow={(record: any, rowIndex: any) => {
          return {
            onClick: event => onClickRow(record, event)
          };
        }}
        scroll={{ x: 1500, y: 900 }}
      ></Table>
      {/* <TestBackend /> */}
      <Button onClick={() => addNewEvent(event)}>Create Event</Button>
    </div>
  );
};

export default ScheduleTable;

const event = {
  id: 'KyvcYfdhjMuXQeK4eoYc',
  name: 'HTML',
  description: 'Студент знакомится с HTML',
  descriptionUrl: 'https://guides.hexlet.io/markdown/',
  type: ['htmlTask', 'info'],
  timeZone: 3,
  dateTime: 1600291763391,
  place: 'class',
  comment: 'Создан и размещён на gh-pages файл HTML',
  trainee: 'Сергей Шаляпин',
  courseName: 'jsFrontEnd',
  timeToImplementation: 4,
  broadcastUrl: 'Link on Video',
  materialsLinks: ['link1', 'link2'],
  block: 'HTML',
  result: 'Студент знает HTML',
  stack: ['HTML', 'CSS', 'Markdown'],
  feedBack: 'Cool',
  taskBreakpoints: [1600291763391, 1600291764391],
  videoLink: 'string'
};

const container = css`
  // display: flex;
  margin: 20px;
  user-select: none;
`;

const hide = css`
  width: 0px;
`;

const filter = ['description', 'type', 'place'];
