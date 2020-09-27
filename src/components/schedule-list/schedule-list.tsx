import React, { useState, useEffect } from 'react';
import { Tag, Card, Spin, List } from 'antd';
import { TYPES_WITH_COLORS, FILTERS } from 'constants/dataForTable';
import { IEvent } from '../../services/events-service';
import { getDateFromTimeStamp, getTimeFromString } from '../../utils/utils';
import { css } from '@emotion/core';

const ScheduleList = (props: any) => {
  const { getEvents, eventsData, loading, isStudent, timeZone, course, typeColors, changeTypeColors } = props;

  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRow] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    let newData: any = eventsData.map((item: any, idx: number) => {
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
        timeToImplementation: `${item.timeToImplementation} h`,
        dateTime: item.deadline,
        type: [...item.type, 'deadline']
      };
    });

    const result: any = [...newData, ...copy].sort((a: IEvent, b: IEvent) => a.dateTime[0] - b.dateTime[0]);
    setData(result);
  }, [eventsData]);

  const handleSelectRow = (evt: any) => {
    console.log(evt.target);
  };

  const getData = (items: any, query: string) =>
    [items.find((item: any) => query === item.value)].map(x => x && x.text).shift();

  if (loading && eventsData.length === 0) return <Spin />;
  console.log(eventsData);
  return (
    <div className="schedule-list-container" css={container}>
      <List
        css={listStyles}
        bordered={true}
        dataSource={data}
        size="large"
        renderItem={(item: IEvent) => (
          <List.Item onClick={handleSelectRow}>
            <div css={listItemContainer}>
              <p css={listItemDate}>
                <span>{getDateFromTimeStamp(item.dateTime, timeZone)}</span>
                <span> </span>
                <span>{getTimeFromString(item.dateTime, timeZone, item.timeZone)}</span>
              </p>
              <p css={listItemName}>{item.name}</p>
            </div>
            <div css={tagsStyles}>
              {item.type.map((typeitem, idx) => {
                return (
                  <Tag color={TYPES_WITH_COLORS[typeitem]} key={idx.toString()}>
                    {getData(FILTERS, typeitem)}
                  </Tag>
                );
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
  margin-right: 30px;
`;

const tagsStyles = css`
  width: 150px;
`;

const listItemDate = css`
  margin-right: 15px;
  font-weight: bold;
`;

const listItemTime = css`
  margin-right: 15px;
  font-weight: bold;
`;

const listItemName = css`
  font-weight: bold;
`;
