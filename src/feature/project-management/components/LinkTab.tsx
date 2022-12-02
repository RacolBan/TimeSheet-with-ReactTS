/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import SLink from '../../../components/Link';
import { IProjectForm } from '../../../redux/project/interface';
interface Props{
  projectEditing: IProjectForm | null
}
export default function LinkTab ({ projectEditing }: Props): JSX.Element {
  return (
    <div className='linkTab flex'>
      <SLink to={ projectEditing === null ? '/App/project/Create/general' : `/App/project/Edit/${projectEditing.id}/general`}icon={null} title='General' />
      <SLink to={ projectEditing === null ? '/App/project/Create/team' : `/App/project/Edit/${projectEditing.id}/team`} icon={null} title='Team' />
      <SLink to={ projectEditing === null ? '/App/project/Create/task' : `/App/project/Edit/${projectEditing.id}/task`} icon={null} title='Task' />
      <SLink to={ projectEditing === null ? '/App/project/Create/noti' : `/App/project/Edit/${projectEditing.id}/noti`} icon={null} title='Notification' />
    </div>
  );
}
