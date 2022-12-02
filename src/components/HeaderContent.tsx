import { ReloadOutlined } from '@ant-design/icons';
import React from 'react';
import { useAppDispatch } from '../hooks/useToast';
import { getAllProject } from '../redux/project/thunks';
interface Props {
  title: string
}

export const HeaderContent: React.FC <Props> = (props) => {
  const dispatch = useAppDispatch();
  const handleClick = (): void => {
    void dispatch(getAllProject('0'));
  };
  return (
    <div className='headerContent'>
      <div className='headerContent-title'>{ props.title }</div>
      <div className='headerContent-icon'>
        <span onClick={handleClick}><ReloadOutlined /></span>
      </div>
    </div>
  );
};
