import React from 'react';
import { useSelector } from 'react-redux';
import { ITimeSheetStatisticTask } from '../../../redux/project/interface';
import { getTimeSheetTask } from '../../../redux/project/selector';
import TaskItem from '../components/TaskItem';
enum type{
  billableList,
  nonBillableList
}
export default function Task (): JSX.Element {
  const listTaskTimeSheet = useSelector(getTimeSheetTask);
  const billableList = listTaskTimeSheet.filter(
    (task: ITimeSheetStatisticTask) => task.billable
  );
  const nonBillableList = listTaskTimeSheet.filter(
    (task: ITimeSheetStatisticTask) => task.billable === false
  );
  return (
    <div className='taskTab'>
      <TaskItem list={billableList} type={type.billableList} />
      <TaskItem list={nonBillableList} type={type.nonBillableList} />
    </div>
  );
}
