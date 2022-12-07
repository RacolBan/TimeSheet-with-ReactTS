import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../../hooks/useToast';
import { getIsAllBillable, getSelectedTaskList, getUnSelectedTaskList } from '../../../../../redux/project/selector';
import { filterSelectedTask } from '../../../../../redux/project/slice';
import TaskList from './TaskList';
enum typeTask {
  selectedTask,
  unSelectedTask
}
export default function TaskTab (): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(filterSelectedTask());
  }, [dispatch]);
  const selectedtaskList = useSelector(getSelectedTaskList);
  const taskList = useSelector(getUnSelectedTaskList);
  const isBillable = useSelector(getIsAllBillable);
  return (
    <Row className='task'>
      <Col span={12} className='task-unselected' style={{ borderRight: '1px solid black' }} >
        <TaskList type={typeTask.unSelectedTask} taskList={taskList} isBillable={isBillable} />
      </Col>
      <Col span={11} className='task-selected' offset={1}>
        <TaskList type={typeTask.selectedTask} taskList={selectedtaskList} isBillable={isBillable} />
      </Col>
    </Row>
  );
}
