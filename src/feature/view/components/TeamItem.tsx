import React from 'react';
import { ITimeSheetStatisticTeam } from '../../../redux/project/interface';
interface Props {
  list: ITimeSheetStatisticTeam[]
}
export default function TeamItem ({ list }: Props): JSX.Element {
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
            <th>Name</th>
            <th>Hours</th>
            <th></th>
            <th>Billable Hours</th>
          </tr>
        </thead>
          <tbody>
            {
              list.map(member => (
                <tr key={member.userID}>
                  <td>{member.userName}</td>
                  <td>{member.totalWorkingTime !== 0 ? member.totalWorkingTime : ''}</ td>
                  <td><span className='bar-percent'></span></td>
                <td>{`${calcProgress(member.billableWorkingTime, member.totalWorkingTime)}%`}</td>
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
