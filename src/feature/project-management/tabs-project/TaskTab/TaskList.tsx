import { Checkbox, Col, Row } from 'antd';
import React from 'react';
import { ITask } from '../../../../redux/project/enum.user';
import TaskItem from './TaskItem';
interface Props {
  type: number
  taskList: ITask[]
  isBillable: boolean
  handleChange: () => void
}
export default function TaskList ({ type, taskList, isBillable, handleChange }: Props): JSX.Element {
  return (
    <div >
    {type === 0
      ? <Row>
            <Col span={12}>
            <h1>Tasks</h1>
          </Col>
            <Col offset={2}>
              <Checkbox checked={isBillable} onChange={() => handleChange()} > Billable</Checkbox>
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
