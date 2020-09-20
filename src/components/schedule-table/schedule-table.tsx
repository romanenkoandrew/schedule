import React, { useState, useEffect, useMemo } from 'react';
import { Table, Tag, Button, Space, Input, Spin, Select, DatePicker, Popconfirm, InputNumber } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FILTERS } from 'constants/dataForTable';
import { TYPE_COLORS } from 'constants/globalConstants';
import { SketchPicker } from 'react-color';
import moment from 'moment';
import { IEvent } from '../../services/events-service';
import { css } from '@emotion/core';
import TextArea from 'antd/lib/input/TextArea';

const ScheduleTable = (props: any) => {
  const {
    getEvents,
    eventsData,
    loading,
    isStudent,
    timeZone,
    course,
    addNewEvent,
    deleteEvent,
    updateEvent,
    typeColors,
    changeTypeColors
  } = props;
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

  const optionsForTagsSelect = FILTERS.map((type: any) => ({ value: type.text }));

  const initialObj: any = {};

  const [selectedRowKeys, setSelectedRowKeys] = useState(initialSelect);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const [options, setOptions] = useState(optionsForSelect);
  const [tagOptions, setTagOptions] = useState(initialSelect);
  const [hideRows, setHideRows] = useState(initialSelect);

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [changingType, setChangingType] = useState('');

  const [editableEvent, setEditableEvent] = useState(initialObj);

  useEffect(() => {
    setEditableEvent(initialObj);
    setDisplayColorPicker(false);
  }, [isStudent]);

  useEffect(() => {
    getEvents();
    if (localStorage.getItem(TYPE_COLORS)) {
      const colors = JSON.parse(localStorage.getItem(TYPE_COLORS) || '{}');
      changeTypeColors(colors);
    }
  }, []);

  useEffect(() => {
    if (editableEvent.id) {
      setEditableEvent({
        ...editableEvent,
        dateTime: editableEvent.dateTime - editableEvent.timeZone * 3600000 + timeZone * 3600000
      });
    }
  }, [timeZone]);

  useEffect(() => {
    console.log(eventsData);
    let newData: any = eventsData.map((item: any) => {
      item.key = item.id;
      return {
        ...item,
        timeToImplementation: `${item.timeToImplementation} h`,
        dateTime: item.dateTime - item.timeZone * 3600000 + timeZone * 3600000
      };
    });
    newData.sort((a: IEvent, b: IEvent) => a.dateTime - b.dateTime);
    setData(newData);
  }, [eventsData]);

  const handleChangeEvent = (row: string, block: any, event: any): void => {
    setEditableEvent({
      ...editableEvent,
      [block]: event.target.value
    });
  };

  const hoursChange = (value: string | number | undefined, field: string) => {
    setEditableEvent({
      ...editableEvent,
      [field]: value
    });
  };

  const dateChange = (moment: any, dateString: string, field: string) => {
    setEditableEvent({
      ...editableEvent,
      [field]: new Date(moment).getTime()
    });
  };

  const onClickRow = (record: { key: string }, event: any) => {
    if (
      event.target.classList.contains('button-hide') ||
      event.target.classList.contains('button-delete') ||
      event.target.classList.contains('button-edit') ||
      editableEvent.id
    ) {
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
      if (typeof row[key] === 'object') {
        newDataItem[key] = [];
      } else {
        newDataItem[key] = '';
      }
    }
    return newDataItem;
  };

  const hideHandle = (row: { [propName: string]: any }) => {
    const newData: any = [...data];
    const newHideRows: any = [...hideRows];
    const index = newData.findIndex((item: { [propName: string]: any }) => item.key === row.key);
    const hideRowKeys = newHideRows.map((item: any) => item.key);

    if (!selectedRowKeys.includes(row.key)) {
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
    (() => {
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    })();
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText('');
  };

  const columns: any = [
    {
      title: 'Date/time',
      dataIndex: 'dateTime',
      width: 120,
      key: 'dateTime',
      sorter: (a: any, b: any) => a.dateTime - b.dateTime,
      render: (block: any, row: any) => {
        console.log('rendeeeeeer');
        const options = {
          year: 'numeric',
          day: 'numeric',
          month: 'numeric'
        };
        const date =
          typeof block === 'number' ? new Date(block + timeZone * 3600000).toLocaleString('en-GB', options) : '';
        if (editableEvent && editableEvent.id === row.id) {
          return (
            <DatePicker
              format={'DD/MM/YYYY'}
              defaultValue={moment(date, 'DD/MM/YYYY')}
              style={{ width: '100%' }}
              onChange={(moment, dateString) => dateChange(moment, dateString, 'dateTime')}
            />
          );
        }
        return <>{date}</>;
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
        if (editableEvent && editableEvent.id === row.id) {
          return (
            <TextArea value={editableEvent.block} onChange={(event: any) => handleChangeEvent(row, 'block', event)} />
          );
        }
        return <span>{block}</span>;
      }
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: FILTERS,
      width: 190,
      align: 'center',
      onFilter: (value: any, record: any) => record.type.includes(value),
      render: (tags: any, row: any) => {
        if (editableEvent && editableEvent.id === row.id) {
          const tagsOptions = tags.reduce((acc: any, tag: any) => {
            const findTag: any = FILTERS.find((type: any) => type.value === tag);
            acc.push(findTag.text);
            return acc;
          }, []);

          return (
            <Select
              mode="multiple"
              showArrow
              style={{ width: '100%' }}
              tagRender={props => tagRender(props, row)}
              options={optionsForTagsSelect}
              defaultValue={tagsOptions}
              onSelect={(option, ...args) => {
                const newTagOptions = [...tagOptions];
                // console.log(newTagOptions, option.toLowerCase().replace(/\b\s([a-z])/g, (_: any, char: any) => char.toUpperCase()))
                newTagOptions.push({
                  value: option.toLowerCase().replace(/\b\s([a-z])/g, (_: any, char: any) => char.toUpperCase())
                });
                setEditableEvent({
                  ...editableEvent,
                  type: newTagOptions.map(tag => tag.value)
                });
                setTagOptions(newTagOptions);
              }}
              onDeselect={option => {
                const newTagOptions = [...tagOptions];
                const index = newTagOptions.findIndex(
                  item =>
                    item.value ===
                    option.toLowerCase().replace(/\b\s([a-z])/g, (_: any, char: any) => char.toUpperCase())
                );
                newTagOptions.splice(index, 1);
                setEditableEvent({
                  ...editableEvent,
                  type: newTagOptions.map(tag => tag.value)
                });
                setTagOptions(newTagOptions);
              }}
            />
          );
        }
        return (
          <>
            {tags.map((tag: string) => {
              // let color = TYPES_WITH_COLORS[tag];
              // const colorKey = label.toLowerCase().replace(/\b\s([a-z])/g, (_: any, char: any) => char.toUpperCase());
              let colorType = typeColors[tag];
              return (
                <Tag color={colorType} key={tag} style={{ border: '0px', marginBottom: '3px' }}>
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
      // render: (text: string, itemData: any) => <a href={`${itemData.descriptionUrl}`}>{text}</a>
      render: (block: any, row: any) => {
        if (editableEvent && editableEvent.id === row.id) {
          return (
            <TextArea value={editableEvent.name} onChange={(event: any) => handleChangeEvent(row, 'name', event)} />
          );
        }
        return <a href={`${row.descriptionUrl}`}>{block}</a>;
      }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (block: any, row: any) => {
        if (editableEvent && editableEvent.id === row.id) {
          return (
            <TextArea
              value={editableEvent.description}
              onChange={(event: any) => handleChangeEvent(row, 'description', event)}
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
        if (editableEvent && editableEvent.id === row.id) {
          return (
            <TextArea value={editableEvent.place} onChange={(event: any) => handleChangeEvent(row, 'place', event)} />
          );
        }
        return <span>{block}</span>;
      }
    },
    {
      title: 'Time Theory & practice',
      dataIndex: 'timeToImplementation',
      key: 'timeToImplementation',
      render: (block: any, row: any) => {
        if (editableEvent && editableEvent.id === row.id) {
          return (
            <InputNumber
              min={1}
              max={100}
              defaultValue={parseFloat(editableEvent.timeToImplementation)}
              onChange={(value: string | number | undefined) => hoursChange(value, 'timeToImplementation')}
            />
          );
        }
        return <span>{block}</span>;
      }
    },
    {
      title: 'Materials',
      dataIndex: 'materialsLinks',
      key: 'materialsLinks',
      align: 'center',
      render: (links: any, row: IEvent) => {
        // if (typeof links === 'object') {
        if (editableEvent && editableEvent.id === row.id) {
          return (
            // <TextArea value={editableEvent.result} onChange={(event: any) => handleChangeEvent(row, 'result', event)} />
            links.map((link: string) => (
              <TextArea key={link} style={{ display: 'block', margin: '2px auto' }} value={link} />
            ))
          );
        }
        return links.map((link: string) => (
          <span key={link} style={{ display: 'block', margin: '2px auto' }}>
            {link}
          </span>
        ));
        // }
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
        if (editableEvent && editableEvent.id === row.id) {
          return (
            <TextArea value={editableEvent.result} onChange={(event: any) => handleChangeEvent(row, 'result', event)} />
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
        if (editableEvent && editableEvent.id === row.id) {
          return (
            <TextArea
              value={editableEvent.comment}
              onChange={(event: any) => handleChangeEvent(row, 'comment', event)}
            />
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
          {!editableEvent.id && (
            <a className="button-hide" onClick={() => hideHandle(props)}>
              {hideRows.some(item => item.key === props.key) ? 'Show' : 'Hide'}
            </a>
          )}
          {!isStudent && !editableEvent.id && (
            <a className="button-delete" onClick={() => deleteEvent(props.id)}>
              Delete
            </a>
          )}
          {!isStudent &&
            (!editableEvent.id ? (
              <a
                className="button-edit"
                onClick={() => {
                  const tagsOptions = props.type.reduce((acc: any, tag: any) => {
                    const findTag: any = FILTERS.find((type: any) => type.value === tag);
                    acc.push({
                      value: findTag.text
                        .toLowerCase()
                        .replace(/\b\s([a-z])/g, (_: any, char: any) => char.toUpperCase())
                    });
                    return acc;
                  }, []);
                  console.log(tagsOptions);
                  setEditableEvent(props);
                  setTagOptions(tagsOptions);
                }}
              >
                Edit
              </a>
            ) : (
              <span>
                <a
                  onClick={() => {
                    const updatedEvent = {
                      ...editableEvent,
                      timeToImplementation: parseFloat(editableEvent.timeToImplementation)
                    };
                    delete updatedEvent.key;
                    updateEvent(updatedEvent);
                    setEditableEvent(initialObj);
                    localStorage.setItem(TYPE_COLORS, JSON.stringify(typeColors));
                  }}
                  style={{ marginRight: 8 }}
                >
                  Save
                </a>
                <Popconfirm
                  title="Sure to cancel?"
                  onConfirm={() => {
                    setEditableEvent(initialObj);
                    setDisplayColorPicker(false);
                  }}
                >
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ))}
        </Space>
      )
    }
  ].filter((item: any) => options.reduce((acc: any, item) => acc.concat(item.value), []).includes(item.title));

  function tagRender(props: any, row?: any) {
    const { label, value, closable, onClose } = props;
    const colorKey = label.toLowerCase().replace(/\b\s([a-z])/g, (_: any, char: any) => char.toUpperCase());
    let colorType = typeColors[colorKey];
    return (
      <>
        <Tag
          color={colorType}
          closable={closable}
          onClose={onClose}
          style={{ marginRight: 3 }}
          onClick={() => {
            setDisplayColorPicker(prev => !prev);
            setChangingType(colorKey);
          }}
        >
          {label.toUpperCase()}
        </Tag>
        {displayColorPicker && editableEvent && row && editableEvent.id === row.id && changingType === colorKey ? (
          <div css={popover}>
            <div css={cover} />
            <SketchPicker
              color={typeColors[colorKey]}
              onChange={color => changeTypeColors({ ...typeColors, [colorKey]: color.hex })}
            />
          </div>
        ) : null}
      </>
    );
  }

  // if (loading && data.length === 0) return <Spin />;

  return (
    <div className="schedule-table-container" css={container}>
      {/* <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Download as XLS" /> */}
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
        id="table-to-xls"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        bordered
        loading={loading}
        onRow={(record: any, rowIndex: any) => {
          return {
            onClick: event => onClickRow(record, event)
          };
        }}
        scroll={{ x: 1500, y: 900 }}
      ></Table>
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
  deadline: 1600291983391,
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
  feedBack: ['Cool', 'Bad'],
  videoLink: 'string'
};

const popover = css`
  position: absolute;
  z-index: 10;
`;

const cover = css`
  position: 'fixed';
  top: '0px';
  right: '0px';
  bottom: '0px';
  left: '0px';
`;

const container = css`
  // display: flex;
  margin: 20px;
  user-select: none;
`;

const hide = css`
  width: 0px;
`;

const filter = ['description', 'type', 'place'];
