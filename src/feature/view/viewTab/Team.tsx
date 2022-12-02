import React from 'react';
import { useSelector } from 'react-redux';
import { getTimeSheetTeam } from '../../../redux/project/selector';
import TeamItem from '../components/TeamItem';
export default function Task (): JSX.Element {
  const listTeamTimeSheet = useSelector(getTimeSheetTeam);
  return (
    <div className='taskTab'>
      <TeamItem list={listTeamTimeSheet} />
    </div>
  );
}
