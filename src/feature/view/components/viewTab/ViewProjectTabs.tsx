import { Tabs } from 'antd';
import React from 'react';
import Task from './Task';
import Team from './Team';

export default function ViewProjectTab (): JSX.Element {
  const items = [
    { label: 'Tasks', key: '1', children: <Task /> },
    { label: 'Team', key: '2', children: <Team/> }
  ];
  return (
    <Tabs size='middle' items={items} />
  );
}
