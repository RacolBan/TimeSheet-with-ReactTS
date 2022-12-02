import React from 'react';
import { ITimeSheetStatisticTask } from '../../../redux/project/interface';
interface Props {
  list: ITimeSheetStatisticTask[]
  type: number
}
export default function TaskItem ({ list, type }: Props): JSX.Element {
  let totalWorkingTime = 0;
  let totalBillableWorkingTime = 0;
  list?.forEach((ele) => {
    totalWorkingTime = totalWorkingTime + ele.totalWorkingTime;
    totalBillableWorkingTime = totalBillableWorkingTime + ele.billableWorkingTime;
  });
  const calcProgress = (workingTime: number, billableWorkingTime: number): number => {
    if ((billableWorkingTime === 0) || (workingTime === 0)) return 0;
    else return (billableWorkingTime / workingTime) * 100;
  };
  return (
    <div>
      <table className='view-table'>
          <colgroup>
          <col width='30%' />
          <col width='20%' />
          <col width='25%' />
          <col width='25%' />
          </colgroup>
        <thead className='thead'>
          <tr>
            <th>{type === 0 ? 'Billable Tasks' : 'Non-Billable Tasks'}</th>
            <th>Hours</th>
            <th></th>
            <th>{type === 0 ? 'Billable Hours' : ''}</th>
          </tr>
        </thead>
          <tbody>
            {
              list.map(task => (
                <tr key={task.taskId}>
                  <td>{task.taskName}</td>
                <td>{task.totalWorkingTime !== 0 ? task.totalWorkingTime : ''}</ td>
                  <td><span className='bar-percent'></span></td>
                <td>{ type === 0 ? `${calcProgress(task.billableWorkingTime, task.totalWorkingTime)}%` : '' }</td>
              </tr>
              ))
            }
          </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <td></td>
            <td><span className='bar-percent'></span></td>
            <td>0%</td>
          </tr>
        </tfoot>
    </table>
    </div>
  );
}
