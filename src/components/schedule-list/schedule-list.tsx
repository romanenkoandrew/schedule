import './list.css';

import React, { useState, useEffect } from 'react';
import { Tag, Spin, List, Button } from 'antd';
import { TYPE_COLORS } from 'constants/globalConstants';
import { FILTERS } from 'constants/dataForTable';
import { IEvent } from '../../services/events-service';
import { getDateFromTimeStamp, getTimeFromString } from '../../utils/utils';
import { css } from '@emotion/core';


const ScheduleList = (props: any) => {
  const {
    getEvents,
    eventsData,
    loading,
    timeZone,
    courses,
    typeColors,
    changeTypeColors,
    openModal,
    addId
  } = props;
  
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRow] = useState<Array<string>>([]);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    getEvents();
  }, []);
  
  useEffect(() => {
    let newData: IEvent[] = eventsData.map((item: any, idx: number) => {
      const key = item.id;
      return {
        ...item,
        key,
        timeToImplementation: `${item.timeToImplementation} h`
      };
    });

    const copy = newData.map((item: any, idx: number) => {
      const key = `${item.id}${idx}`;
      return {
        ...item,
        key,
        id: key,
        dateTime: item.deadline,
        type: ['deadline']
      };
    });
    const result: any = [...newData, ...copy]
      .filter((event: IEvent) => courses.includes(event.courseName))
      .sort((a: IEvent, b: IEvent) => a.dateTime[0] - b.dateTime[0]);
    setData(result);
  }, [eventsData, courses]);
  
  useEffect(() => {
    getEvents();
    if (localStorage.getItem(TYPE_COLORS)) {
      const colors = JSON.parse(localStorage.getItem(TYPE_COLORS) || '{}');
      changeTypeColors(colors);
    }
  }, []);
  
  const handleClick = (evt: any) => {
    const id = evt.currentTarget.dataset.id;
    if (selectedRows.includes(id)) {
      setSelectedRow(selectedRows.filter(item => item !== id));
    }
    else {
      setSelectedRow([...selectedRows, id]);
    }    
  };
  
  const setBgColor = (id: string) => {
    if (selectedRows.includes(id)) {
      return '#e6f7ff';
    }
    else {
      return '#fff';
    }
  };
  
  const handleDblClick = (evt: any) => {
    addId(evt.currentTarget.dataset.id);
    openModal();
  };

  const getData = (items: any, query: string) =>
    [items.find((item:any) => query === item.value)]
    .map(x => x && x.text).shift();

  const buttonCaption = (isHidden) ? "Show" : "Hide";
  const isVisible = (selectedRows.length) ? "display:block" : "display:none";
  
  const handleHideShowSelectedItems = () => {
    setIsHidden(!isHidden);
  };
  
  const getFilteredData: IEvent[] = data.filter((item: IEvent) => 
    !selectedRows.includes(item.id) || !isHidden);

  if (loading && eventsData.length === 0) return <Spin css={centerSpin}/>;  

  return (    
    <div className="schedule-list-container" css={container}>
      <Button css={btnHideShow} onClick={handleHideShowSelectedItems}>{buttonCaption}</Button>
      <List css={listStyles}
        bordered={true}
        header={ 
          <div className="listHeader">
            <p className="headerDate">{"Date"}</p>
            <p className="headerTime">{"Time"}</p>
            <p className="headerName">{"Event Name"}</p>
          </div>
        }
        dataSource={getFilteredData}
        size="large"
        renderItem={(item:IEvent) => (
          <List.Item css={listitem} data-id={item.id} style={{ backgroundColor: setBgColor(item.id) }}
            onClick={handleClick} onDoubleClick={handleDblClick}>
            <div css={listItemContainer}>
              <p css={listItemDate}>{getDateFromTimeStamp(item.dateTime, timeZone)}</p>
              <p css={listItemTime}>{getTimeFromString(item.dateTime, timeZone, item.timeZone)}</p>
              <p><a target="_blank" rel="noopener noreferrer" href={item.descriptionUrl}>{item.name}</a></p>
            </div>
            <div css={tagsStyles}>
              {item.type.map((typeitem, idx) => {
                return <Tag color={typeColors[typeitem].background} style={{ border: '0px', marginBottom: '3px', color: typeColors[typeitem].textColor }} key={idx.toString()}>{getData(FILTERS, typeitem)}</Tag>
              })}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ScheduleList;

const container = css`
  margin: 20px;
`;

const listStyles = css`
  margin: 0 auto;
  max-width: 1000px;
`;

const listItemContainer = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;  
`;

const listitem = css`
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

const listItemDate = css`
  width: 60px;
  margin-right: 30px;
`;

const listItemTime = css`
  width: 60px;
`;

const btnHideShow = css`
  position: absolute;
  right: 0;
`;

const tagsStyles = css`
  width: 150px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const centerSpin = css`
  position: absolute;
  left: calc(100vw/2);
  top: calc(100vh/2);
`;
