import React, { useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Button,
  Space,
  Input,
  Select,
  DatePicker,
  Popconfirm,
  InputNumber,
  TimePicker,
  Alert,
  List
} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FILTERS } from 'constants/dataForTable';
import { TYPE_COLORS, COLUMN_OPTIONS, IColorsOfTypes, IColorType } from 'constants/globalConstants';
import { SketchPicker } from 'react-color';
import moment from 'moment';
import { IEvent } from '../../services/events-service';
import { css } from '@emotion/core';
import TextArea from 'antd/lib/input/TextArea';
import { getDateFromTimeStamp, getTimeFromString } from 'utils/utils';
import { isArray } from 'lodash';
import { getFromLocalStorage } from 'utils/utils';

export interface IEventWithKey {
  id: string;
  name: string;
  description: string;
  descriptionUrl: string;
  type: string[];
  timeZone: number;
  dateTime: [number, string];
  place: string;
  comment: string;
  trainee: string;
  courseName: string;
  timeToImplementation: number;
  broadcastUrl: string;
  materialsLinks: string[];
  result: string;
  deadline: [number, string];
  feedback: string[];
  isFeedback: boolean;
  isEventOnline: boolean;
  key: string;
  [propName: string]: any;
}

const ScheduleTable = (props: any) => {
  const {
    getEvents,
    eventsData,
    loading,
    isStudent,
    timeZone,
    courses,
    addNewEvent,
    deleteEvent,
    updateEvent,
    typeColors,
    changeTypeColors,
    openModal,
    isOpenModal,
    addId,
    error
  } = props;
  const initialSelect: any[] = [];

  const optionsForSelect = [
    { value: 'Date' },
    { value: 'Time' },
    { value: 'Course' },
    { value: 'Type' },
    { value: 'Task' },
    { value: 'Place' },
    { value: 'Time Theory & practice' },
    { value: 'Trainee' },
    { value: 'Materials' },
    { value: 'Result' },
    { value: 'Comment' },
    { value: 'Action' }
  ];

  const columnOptions = getFromLocalStorage(COLUMN_OPTIONS, optionsForSelect);

  const optionsForTagsSelect = FILTERS.map((type: { text: string; value: string }) => ({ value: type.text }));

  const initialObj: any = {};

  const [selectedRowKeys, setSelectedRowKeys] = useState(initialSelect);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState(initialSelect);
  const [options, setOptions] = useState(columnOptions);
  const [tagOptions, setTagOptions] = useState(initialSelect);
  const [hideRows, setHideRows] = useState(initialSelect);

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [changingType, setChangingType] = useState('');
  const [changingRowType, setChangingRowType] = useState(initialObj);

  const [editableEvent, setEditableEvent] = useState(initialObj);

  useEffect(() => {
    setEditableEvent(initialObj);
    setDisplayColorPicker(false);
  }, [isStudent]);

  useEffect(() => {
    getEvents();
    document.addEventListener('click', handleCloseColorPicker);

    return () => {
      document.removeEventListener('click', handleCloseColorPicker);
    };
  }, []);

  useEffect(() => {
    let newData: IEvent[] = eventsData.map((item: IEvent, idx: number) => {
      const key = item.id;
      return {
        ...item,
        key,
        timeToImplementation: `${item.timeToImplementation} h`
      };
    });

    const copy = newData.map((item: IEvent, idx: number) => {
      const key = `${item.id}${idx}`;
      return {
        ...item,
        key,
        id: key,
        dateTime: item.deadline,
        type: ['deadline']
      };
    });

    const result: IEvent[] = [...newData, ...copy]
      .filter((event: IEvent) => courses.includes(event.courseName))
      .sort((a: IEvent, b: IEvent) => {
        const [aHours, aMinutes] = a.dateTime[1].split(':');
        const [bHours, bMinutes] = b.dateTime[1].split(':');
        const aMilliseconds = +aHours * 3600000 + +aMinutes * 60000;
        const bMilliseconds = +bHours * 3600000 + +bMinutes * 60000;
        return a.dateTime[0] + aMilliseconds - (b.dateTime[0] + bMilliseconds);
      });

    setData(result);
  }, [eventsData, courses]);

  const handleCloseColorPicker = (event: any): void => {
    if (event.target.closest('.css-163w0fi-popover') === null && !event.target.closest('.ant-tag')) {
      setDisplayColorPicker(false);
    }
  };

  const handleChangeEvent = (row: IEvent, block: string, event: any): void => {
    if (block === 'materialsLinks') {
      setEditableEvent({
        ...editableEvent,
        [block]: event.target.value
      });
    }
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

  const handleChangeTypeColors = (typeColors: IColorsOfTypes) => {
    changeTypeColors(typeColors);
  };

  const checkDate = (dateData: [number, string]) => {
    if (!dateData.length) {
      return false;
    }
    const timestamp: number = dateData[0];
    const [hours, minutes] = dateData[1].split(':');
    const dateWithUserUTC =
      timestamp -
      -new Date().getTimezoneOffset() * 60000 +
      timeZone * 3600000 -
      new Date(timestamp).getHours() * 3600000 -
      new Date(timestamp).getMinutes() * 60000 -
      new Date(timestamp).getSeconds() * 1000 -
      new Date(timestamp).getMilliseconds() +
      +hours * 3600000 +
      +minutes * 60000;

    return dateWithUserUTC < new Date().getTime();
  };

  const dateChange = (moment: any, dateString: string, field: string) => {
    const date = new Date(moment);
    setEditableEvent({
      ...editableEvent,
      timeZone,
      [field]: [date.getTime(), editableEvent[field][1]]
    });
  };

  const changeTime = (moment: any, timeString: string, field: string) => {
    setEditableEvent({
      ...editableEvent,
      timeZone,
      [field]: [editableEvent[field][0], timeString]
    });
  };

  const onClickRow = (record: IEventWithKey, event: any) => {
    if (
      event.target.classList.contains('button-hide') ||
      event.target.classList.contains('button-delete') ||
      event.target.classList.contains('button-edit') ||
      event.target.classList.contains('ant-tag') ||
      event.target.classList.contains('button-show-details') ||
      event.target.tagName === 'A' ||
      displayColorPicker ||
      editableEvent.id
    ) {
      return;
    }
    const { key } = record;
    let newSelectedRowKeys: string[] = [...selectedRowKeys];
    const index = newSelectedRowKeys.findIndex((item: string) => {
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

  const dblClickRowHandler = (record: IEvent): void => {
    const isHidden = hideRows.some(item => item.key === record.key);
    if (isHidden) {
      return;
    }
    if (record.type.includes('deadline')) {
      const id = record.id.slice(0, record.id.length - 1);
      setEditableEvent(initialObj);
      addId(id);
      openModal();
      return;
    }
    setEditableEvent(initialObj);
    addId(record.id);
    openModal();
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
      } else if (key === 'materialsLinks') {
        newDataItem[key] = [' '];
      } else {
        newDataItem[key] = '';
      }
    }
    return newDataItem;
  };

  const hideHandle = (row: { [propName: string]: any }): void => {
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

  const columns: {}[] = [
    {
      title: 'Date',
      dataIndex: 'dateTime',
      width: 110,
      key: 'dateTime',
      align: 'center',
      sorter: (a: IEvent, b: IEvent) => {
        const [aHours, aMinutes] = a.dateTime[1].split(':');
        const [bHours, bMinutes] = b.dateTime[1].split(':');
        const aMilliseconds = +aHours * 3600000 + +aMinutes * 60000;
        const bMilliseconds = +bHours * 3600000 + +bMinutes * 60000;
        return a.dateTime[0] + aMilliseconds - (b.dateTime[0] + bMilliseconds);
      },
      fixed: 'left',
      render: (dateData: [number, string], row: IEvent) => {
        const isLost = checkDate(dateData);
        const date = dateData.length ? getDateFromTimeStamp(dateData, timeZone) : null;
        if (editableEvent && editableEvent.id === row.id) {
          const date = getDateFromTimeStamp(editableEvent.dateTime, timeZone);
          return (
            <DatePicker
              format={'DD/MM/YYYY'}
              defaultValue={moment(date, 'DD/MM/YYYY')}
              value={moment(date, 'DD/MM/YYYY')}
              placeholder={date}
              style={{ width: '100%' }}
              onChange={(moment, dateString) => {
                dateChange(moment, dateString, 'dateTime');
              }}
            />
          );
        }
        return <span style={isLost ? { opacity: '.5' } : {}}>{date}</span>;
      }
    },
    {
      title: 'Time',
      dataIndex: 'dateTime',
      width: 120,
      key: 'Time',
      align: 'center',
      render: (dateData: [number, string], row: any) => {
        const isLost = checkDate(dateData);
        const timeWithTimeZone = dateData.length ? getTimeFromString(dateData, timeZone, row.timeZone) : null;
        if (editableEvent && editableEvent.id === row.id) {
          const timeWithTimeZone = editableEvent.dateTime[1];
          return (
            <TimePicker
              value={moment(timeWithTimeZone, 'HH:mm')}
              format={'HH:mm'}
              onChange={(moment, dateString) => changeTime(moment, dateString, 'dateTime')}
            />
          );
        }
        return <span style={isLost ? { opacity: '.5' } : {}}>{timeWithTimeZone}</span>;
      }
    },
    {
      title: 'Course',
      dataIndex: 'courseName',
      key: 'courseName',
      width: 120,
      render: (courseName: string, row: IEvent) => {
        const isLost = checkDate(row.dateTime);
        return <span style={isLost ? { opacity: '.5' } : {}}>{courseName}</span>;
      }
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: FILTERS,
      width: 170,
      align: 'center',
      onFilter: (value: string, record: IEvent) => record.type.includes(value),
      render: (tags: string[], row: IEvent) => {
        const isLost = checkDate(row.dateTime);
        if (editableEvent && editableEvent.id === row.id) {
          const tagsOptions = tags.reduce((acc: any, tag: string) => {
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
              let colorType = typeColors[tag];
              return (
                <div key={tag} style={isLost ? { opacity: '.5' } : {}}>
                  <Tag
                    color={colorType.background}
                    style={{ border: '0px', marginBottom: '3px', color: typeColors[tag].textColor }}
                    onClick={() => {
                      if (tag === 'deadline') return;
                      setDisplayColorPicker(prev => !prev);
                      setChangingType(tag);
                      setChangingRowType(row);
                    }}
                  >
                    {tag.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </Tag>
                  {displayColorPicker && changingRowType.id === row.id && changingType === tag ? (
                    <div css={popover} style={{ display: 'flex', flexDirection: 'row' }}>
                      <div css={cover} />
                      <SketchPicker
                        color={typeColors[tag].background}
                        onChange={color => {
                          handleChangeTypeColors({
                            ...typeColors,
                            [tag]: { ...typeColors[tag], background: color.hex }
                          });
                        }}
                      />
                      <SketchPicker
                        color={typeColors[tag].textColor}
                        onChange={color => {
                          handleChangeTypeColors({
                            ...typeColors,
                            [tag]: { ...typeColors[tag], textColor: color.hex }
                          });
                        }}
                      />
                    </div>
                  ) : null}
                </div>
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
      width: 200,
      ...getColumnSearchProps('name'),
      render: (taskName: string, row: IEventWithKey) => {
        const isLost = checkDate(row.dateTime);
        if (editableEvent && editableEvent.id === row.id) {
          return (
            <TextArea value={editableEvent.name} onChange={(event: any) => handleChangeEvent(row, 'name', event)} />
          );
        }
        return (
          <a href={`${row.descriptionUrl}`} target="_blank" style={isLost ? { opacity: '.5' } : {}}>
            {taskName}
          </a>
        );
      }
    },
    {
      title: 'Place',
      dataIndex: 'place',
      key: 'place',
      width: 150,
      render: (place: string, row: IEvent) => {
        const isLost = checkDate(row.dateTime);
        if (row.isEventOnline) {
          return (
            <a href={`${row.broadcastUrl}`} target="_blank" style={isLost ? { opacity: '.5' } : {}}>
              Online
            </a>
          );
        }
        return <span style={isLost ? { opacity: '.5' } : {}}>{place}</span>;
      }
    },
    {
      title: 'Time Theory & practice',
      dataIndex: 'timeToImplementation',
      key: 'timeToImplementation',
      width: 100,
      align: 'center',
      render: (hours: string, row: IEventWithKey) => {
        const isLost = checkDate(row.dateTime);
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
        return <span style={isLost ? { opacity: '.5' } : {}}>{hours}</span>;
      }
    },
    {
      title: 'Materials',
      dataIndex: 'materialsLinks',
      key: 'materialsLinks',
      align: 'center',
      width: 230,
      render: (links: string[], row: IEvent) => {
        const isLost = checkDate(row.dateTime);
        if (editableEvent && editableEvent.id === row.id) {
          return (
            <TextArea
              value={
                isArray(editableEvent.materialsLinks)
                  ? editableEvent.materialsLinks.join('\n')
                  : editableEvent.materialsLinks
              }
              onChange={(event: any) => handleChangeEvent(row, 'materialsLinks', event)}
            />
          );
        }
        return (
          <List
            dataSource={links || ['']}
            style={isLost ? { opacity: '.5' } : {}}
            locale={{ emptyText: ' ' }}
            renderItem={(itemList: string) => {
              return (
                <List.Item>
                  <a
                    href={itemList}
                    target="_blank"
                    key={itemList}
                    style={{ display: 'inline-block', margin: '2px auto' }}
                  >
                    {itemList}
                  </a>
                </List.Item>
              );
            }}
          />
        );
      }
    },
    {
      title: 'Trainee',
      dataIndex: 'trainee',
      key: 'trainee',
      width: 160,
      ...getColumnSearchProps('trainee'),
      render: (trainee: string, row: IEvent) => {
        const isLost = checkDate(row.dateTime);
        return <span style={isLost ? { opacity: '.5' } : {}}>{trainee}</span>;
      }
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
      width: 200,
      render: (result: string, row: IEventWithKey) => {
        const isLost = checkDate(row.dateTime);
        if (editableEvent && editableEvent.id === row.id) {
          return (
            <TextArea value={editableEvent.result} onChange={(event: any) => handleChangeEvent(row, 'result', event)} />
          );
        }
        return <span style={isLost ? { opacity: '.5' } : {}}>{result}</span>;
      }
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      width: 200,
      render: (comment: string, row: IEventWithKey) => {
        const isLost = checkDate(row.dateTime);
        if (editableEvent && editableEvent.id === row.id) {
          return (
            <TextArea
              value={editableEvent.comment}
              onChange={(event: any) => handleChangeEvent(row, 'comment', event)}
            />
          );
        }
        return (
          <span
            style={
              isLost
                ? { opacity: '.5', textOverflow: 'ellipsis', overflow: 'hidden' }
                : { textOverflow: 'ellipsis', overflow: 'hidden' }
            }
          >
            {comment}
          </span>
        );
      }
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      height: 500,
      width: 170,
      render: (props: IEvent) => {
        const isLost = checkDate(props.dateTime);
        const isDeadline = props.type.includes('deadline');
        const isHidden = hideRows.some(item => item.key === props.key);
        return (
          <Space size="middle" direction="vertical" style={isLost ? { opacity: '.5' } : {}}>
            {!editableEvent.id && (
              <a className="button-hide" onClick={() => hideHandle(props)}>
                {hideRows.some(item => item.key === props.key) ? 'Show' : 'Hide'}
              </a>
            )}
            {!isStudent && !editableEvent.id && !isDeadline && !isHidden && (
              <a className="button-delete" onClick={() => deleteEvent(props.id)}>
                Delete
              </a>
            )}
            {!isStudent &&
              !isDeadline &&
              !isHidden &&
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
                        timeToImplementation: parseFloat(editableEvent.timeToImplementation),
                        materialsLinks: isArray(editableEvent.materialsLinks)
                          ? editableEvent.materialsLinks
                          : editableEvent.materialsLinks.split('\n')
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
            {!isHidden && (
              <a className="button-show-details" onClick={() => dblClickRowHandler(props)}>
                Show Details
              </a>
            )}
          </Space>
        );
      }
    }
  ].filter((item: any) => options.reduce((acc: any, item: any) => acc.concat(item.value), []).includes(item.title));

  function tagRender(props: any, row?: any) {
    const { label, value, closable, onClose } = props;
    const colorKey = label.toLowerCase().replace(/\b\s([a-z])/g, (_: any, char: any) => char.toUpperCase());
    let colorType = !!typeColors[colorKey] ? typeColors[colorKey].background : null;
    const textColor = !!typeColors[colorKey] ? typeColors[colorKey].textColor : null;
    return (
      <>
        <Tag
          color={colorType}
          closable={closable}
          onClose={onClose}
          style={{ marginRight: 5, color: textColor }}
          onClick={() => {
            if (!colorType) {
              return;
            }
            setDisplayColorPicker(prev => !prev);
            setChangingType(colorKey);
            setChangingRowType(row);
          }}
        >
          {label.toUpperCase()}
        </Tag>
        {displayColorPicker &&
        changingRowType &&
        row &&
        changingType &&
        changingRowType.id === row.id &&
        changingType === colorKey ? (
          <div css={popover} style={{ display: 'flex', flexDirection: 'row' }}>
            <div css={cover} />
            <SketchPicker
              color={typeColors[colorKey].background}
              onChange={color => {
                handleChangeTypeColors({
                  ...typeColors,
                  [colorKey]: { ...typeColors[colorKey], background: color.hex }
                });
              }}
            />
            <SketchPicker
              color={typeColors[colorKey].textColor}
              onChange={color => {
                handleChangeTypeColors({
                  ...typeColors,
                  [colorKey]: { ...typeColors[colorKey], textColor: color.hex }
                });
              }}
            />
          </div>
        ) : null}
      </>
    );
  }

  // if (error) {
  //   return <Alert message="Error" description="This is an error message about copywriting." type="error" showIcon />;
  // }
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
        defaultValue={options.reduce((acc: any, item: any) => {
          acc.push(item.value);
          return acc;
        }, [])}
        style={{ width: '100%' }}
        options={optionsForSelect}
        onSelect={(option: any): void => {
          const newOptions = [...options];
          newOptions.push({ value: option });
          setOptions(newOptions);
          localStorage.setItem(COLUMN_OPTIONS, JSON.stringify(newOptions));
        }}
        onDeselect={option => {
          const newOptions = [...options];
          const index = newOptions.findIndex(item => item.value === option);
          newOptions.splice(index, 1);
          setOptions(newOptions);
          localStorage.setItem(COLUMN_OPTIONS, JSON.stringify(newOptions));
        }}
      ></Select>

      <Table
        id="table-to-xls"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        bordered
        // pagination={{ pageSize: 10}}
        loading={loading && !isOpenModal}
        onRow={(record: IEventWithKey) => {
          return {
            onClick: event => onClickRow(record, event),
            onDoubleClick: () => dblClickRowHandler(record)
          };
        }}
        scroll={{ y: 1000 }}
      ></Table>
      {/* <Button onClick={() => addNewEvent(event)}>Create Event</Button> */}
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
  dateTime: [new Date().getTime(), `${new Date().getHours()}:${new Date().getMinutes()}`],
  deadline: [new Date().getTime() + 9000000, `${new Date().getHours()}:${new Date().getMinutes()}`],
  place: 'class',
  comment: 'Создан и размещён на gh-pages файл HTML',
  trainee: 'Сергей Шаляпин',
  courseName: 'JS/Frontend 2020-Q3',
  timeToImplementation: 4,
  broadcastUrl: 'LinkonVideo',
  materialsLinks: ['link1', 'link2'],
  result: 'Студент знает HTML',
  feedBack: ['Cool', 'Bad'],
  isFeedback: false,
  isEventOnline: true
};

const popover = css`
  position: absolute;
  z-index: 20;
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
