import { Checkbox, Col, Row } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../../hooks/useToast';
import { ITask } from '../../../../../redux/project/enum.user';
import { changeAllBillable } from '../../../../../redux/project/slice';
import TaskItem from './TaskItem';
interface Props {
  type: number
  taskList: ITask[]
  isBillable: boolean
}
function TaskList ({ type, taskList, isBillable }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const handleChange = (): void => {
    dispatch(changeAllBillable());
  };
  const [isCheckedAll, setIsCheckedAll] = useState(true);
  const check = taskList.every(task => {
    return task.isBillable;
  });
  useEffect(() => {
    setIsCheckedAll(check);
  }, [taskList]);
  return (
    <div >
    {type === 0
      ? <Row>
            <Col span={12}>
            <h1>Tasks</h1>
          </Col>
            <Col offset={2}>
              <Checkbox checked={isCheckedAll} onChange={() => handleChange()} > Billable</Checkbox>
            </Col>
          </Row>
      : <h1>Select Task</h1>
    }
    <div className='task-container'>
    {taskList.map((task: ITask) => (
      <TaskItem key={task.id} type={type} task={task} />
    ))}
    </div>
    </div>
  );
}
export default memo(TaskList);
