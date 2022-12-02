import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Checkbox, Col, Row } from 'antd';
import React from 'react';
import { useAppDispatch } from '../../../../hooks/useToast';
import { ITask } from '../../../../redux/project/enum.user';
import { changeBillable, deSelectedTask, selectedTask } from '../../../../redux/project/slice';
interface Props {
  task: ITask
  type: number
}
export default function TaskItem ({ task, type }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Row>
      { type === 0
        ? <>
            <Col span={12} className='taskItem' >
                <span className='icon-delete' onClick={ () => dispatch(deSelectedTask(task))} ><CloseOutlined /></span>
                {task.name}
              </Col>
              <Col offset={2} >
                <Checkbox
                checked={task.isBillable ?? false}
                onChange={ () => dispatch(changeBillable(task.id)) } />
              </Col>
          </>
        : <>
          <Col span={12} className='taskItem' >
              <span className='icon-add' onClick={() => dispatch(selectedTask(task))} ><PlusCircleOutlined /></span>
              <span className='icon-text'>
                {task.name}
              </span>
            </Col>
            <Col offset={2} >
              {task.type === 0 ? 'Common Task' : 'Other Task' }
            </Col>
        </>
      }
    </Row>
  );
}
