import React from 'react';
import { Table, Tag } from 'antd';
import { css } from '@emotion/core';

const data = [
  {
    id: '1',
    name: 'Computer Science Basics',
    description:
      'Пройти этот курс рекомендует EPAM. Из описания: Данный тренинг может быть хорошим стартом для дальнейшего изучения программирования и инженерной работы в IT сфере.',
    descriptionUrl: 'http://epa.ms/upskill-start',
    type: 'theory',
    timeZone: 'UTF11+',
    dateTime: '2020-01-23',
    place: 'street',
    comment: 'comment',
    workTime: '12',
    trainee: 'Shalyapin',
    tags: ['theory']
  },
  {
    id: '2',
    name: 'Computer Science Basics',
    description:
      'Пройти этот курс рекомендует EPAM. Из описания: Данный тренинг может быть хорошим стартом для дальнейшего изучения программирования и инженерной работы в IT сфере.',
    descriptionUrl: 'http://epa.ms/upskill-start',
    type: 'theory',
    timeZone: 'UTF11+',
    dateTime: '2020-01-23',
    place: 'street',
    comment: 'comment',
    workTime: '12',
    trainee: 'Shalyapin',
    tags: ['theory']
  },
  {
    id: '3',
    name: 'Computer Science Basics',
    description:
      'Пройти этот курс рекомендует EPAM. Из описания: Данный тренинг может быть хорошим стартом для дальнейшего изучения программирования и инженерной работы в IT сфере.',
    descriptionUrl: 'http://epa.ms/upskill-start',
    type: 'theory',
    timeZone: 'UTF11+',
    dateTime: '2020-01-23',
    place: 'street',
    comment: 'comment',
    workTime: '12',
    trainee: 'Shalyapin',
    tags: ['theory']
  }
];

const columns = [
  {
    title: 'Date/time',
    dataIndex: 'dateTime'
  },
  {
    title: 'Task',
    dataIndex: 'name'
  },
  {
    title: 'Description',
    dataIndex: 'description'
  },
  {
    title: 'Type',
    dataIndex: 'tags',
    render: (tags: any) => (
      <span>
        {tags.map((tag: any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'theory') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: 'Time Theory & practice',
    dataIndex: `${'workTime'}hr`
  },
  {
    title: 'Trainee',
    dataIndex: 'trainee'
  }
];

const ScheduleTable = () => {
  return <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }}></Table>;
};

export default ScheduleTable;
