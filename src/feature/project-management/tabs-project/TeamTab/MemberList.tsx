import React, { useState } from 'react';
import { IUser } from '../../../../redux/project/interface';
import UnSelectedMemberHeader from './UnSelectedMemberHeader';
import SelectedMemberHeader from './SelectedMemberHeader';
import MemberItem from './MemberItem';

interface Props {
  type: number
  memberList: IUser[]
}
export default function MemberList ({ type, memberList }: Props): JSX.Element {
  const [checked, setChecked] = useState(true);
  return (
    <>
      { type === 0
        ? <SelectedMemberHeader setChecked={setChecked} checked={checked} />
        : <UnSelectedMemberHeader/>
      }
      <div className="member">
        { memberList.map((member: IUser) => (
          <MemberItem member={member} key={member.id} type={type} />
        ))}
      </div>
    </>
  );
}
